# Google Health Integration Plan

This document plans the MyDataHelpsUI-side work to support the new **Google Health**
back-end (a cloud/polling API served by `CfhrFramework/GoogleHealth` in Consumers,
analogous to the Fitbit Web API). It covers three efforts:

1. Adding Google Health to the **Connect Devices menu**.
2. Adding **daily data types** for Google Health and wiring them into the shared
   ("combined") daily data types.
3. A **Fitbit backwards-compatibility** strategy so existing Fitbit-configured
   graphs keep working and transparently fall back to Google Health.

> **Dependency:** All of this depends on the pending MyDataHelps.js SDK release that
> adds the `GoogleHealth` device-data namespace and the `googleHealthEnabled` flag on
> `DataCollectionSettings`. Work can be staged behind that; nothing should merge until
> the SDK version in `package.json` (`@careevolution/mydatahelps-js`) is bumped to the
> release that includes them.

---

## Resolved decisions & remaining open questions

- **Connection model — RESOLVED: OAuth external account.** Google Health is a cloud API
  you "connect" to, exactly like Fitbit/Garmin/Oura (not on-device like Health Connect /
  Google Fit). Fitbit participants will be prompted to connect Google Health before
  Fitbit shuts down, so both will be connected during the transition. The menu item
  reuses the existing `ExternalAccountMenuItem` + a provider ID.
- **V2 device-data type names — RESEARCHED** from the Consumers back-end (see the
  "Google Health V2 type mapping" section below). Data is served through the **V2 query
  device data API** (`GoogleHealth` namespace). Steps and resting heart rate are already
  rolled up to one value per day server-side (no aggregate query needed); **sleep** is
  session-based and needs a per-day **sum** aggregate (or client-side summation) — which
  matches your intuition.

Still to confirm:

1. **Provider ID(s).** Need the dev and prod provider IDs to add to
   `src/helpers/providerIDs.ts` (see the `getFitbitProviderID` / `getOuraProviderID`
   pattern).
2. **SDK type-name exposure.** Confirm the pending SDK reports these exact type strings
   via `getDeviceDataV2AllDataTypes()` (the availability layer reads them from there) and
   that `googleHealthEnabled` is on `DataCollectionSettings`.

---

## Background: how the daily-data system is wired today

- **`DailyDataType` enum** — `src/helpers/daily-data-types.tsx`. One entry per selectable
  metric (per-source ones like `FitbitSteps`, plus shared ones like `Steps`).
- **Per-source type definition files** — `src/helpers/daily-data-types/*.tsx`
  (`fitbit.tsx`, `google-fit.tsx`, `combined.tsx`, ...). Each exports an array of
  `DailyDataTypeDefinition` (provider, availability check, label, icon, formatter,
  preview range, `dataSource`). All arrays are merged in
  `src/helpers/daily-data-types/all.ts`.
- **Data providers** — `src/helpers/daily-data-providers/*.ts`, re-exported from
  `index.ts`. A provider is `(startDate, endDate) => Promise<DailyDataQueryResult>`
  (a `dayKey -> number` map).
- **"Combined" / `"Unified"` types** — `combined.tsx` defines cross-source metrics
  (`Steps`, `RestingHeartRate`, `SleepMinutes`, `MindfulMinutes`, `TherapyMinutes`,
  `ActiveCaloriesBurned`). Each has:
  - a `combined*DataProvider` (`daily-data-providers/combined-*.ts`) that checks each
    `settings.<x>Enabled` flag + presence of the relevant queryable type, runs the
    per-source providers, and merges them with `combineResultsUsingMaxValue`
    (steps/sleep) or `combineResultsUsingRoundedAverageValue` (resting heart rate); and
  - an availability check built from a `*_SOURCES` list via `combinedAvailabilityCheck`.
- **Availability checks** — `daily-data-types/availability-check.ts` +
  `daily-data-providers/data-collection-helper.ts`. `sources([namespace, type, opts])`
  declares where a metric can come from; `getSupportedApis` gates each namespace on its
  `settings.<x>Enabled` flag via the `enabledFlags` map and figures out whether the V1
  (`queryDeviceData`) and/or V2 (`queryDeviceDataV2`) API can serve it.
- **Combine helpers** — `daily-data-providers/daily-data/daily-data-result.ts`.
  `combineResultsUsingFirstValue([a, b])` takes, per day, the value from the **first**
  result in the array that has data that day — this is the key primitive for
  "prefer X, fall back to Y".

### Existing precedent worth copying

`StepsWithGoogleFit` (`DailyDataType.StepsWithGoogleFit`, `combined.tsx`) is a variant
of `Steps` that opts an extra source (Google Fit) into the combined provider via a
boolean flag on `combinedStepsDataProvider`. This is the template for adding a new
source to a combined metric without disturbing the existing one.

---

## Effort 1 — Add Google Health to the Connect Devices menu

**File:** `src/components/container/ConnectDevicesMenu/ConnectDevicesMenu.tsx`
(plus assets, provider IDs, preview data).

Assuming the OAuth-external-account model, this mirrors the Fitbit/Garmin/Oura items:

1. Add `"GoogleHealth"` to the `DeviceAccountType` union.
2. Add `"GoogleHealth"` to the default `accountTypes` array, positioned **above
   `"Fitbit"`** (first in the list). Order in this array = display order.
3. Gate it: after the other `settings?.*Enabled` filters, add
   `if (!settings?.googleHealthEnabled) accountTypes = accountTypes.filter(a => a != "GoogleHealth");`
4. Add `getGoogleHealthProviderID()` to `src/helpers/providerIDs.ts` (dev/prod IDs — see
   open question 2).
5. Add a `GoogleHealthLogo` asset under `src/assets/` and import it.
6. Add `getGoogleHealthMenuItem()` that returns
   `getExternalAccountMenuItem("Google Health", getGoogleHealthProviderID(), <img src={GoogleHealthLogo} />)`
   and render it **before** `{getFitbitMenuItem()}` in the JSX.
7. Update `ConnectDevicesMenu.previewdata.ts` to set `googleHealthEnabled: true` and add a
   sample connected account so the story/preview shows it.

This is the "pretty straightforward" item — no new menu-item component is needed if the
OAuth assumption holds; it reuses `ExternalAccountMenuItem`, which already handles the
connect / fetching / connected / reconnect states.

**If instead on-device:** model it on `HealthConnectMenuItem` / `GoogleFitMenuItem`
(platform-aware, "download MyDataHelps" on Web, an SDK settings/prompt call otherwise).
That requires a new SDK method for the Google Health prompt.

---

## Effort 2 — Google Health daily data types + combined mappings

### 2a. Register the namespace

In `src/helpers/daily-data-providers/data-collection-helper.ts` add to `enabledFlags`:

```ts
GoogleHealth: 'googleHealthEnabled',
```

Add `"GoogleHealth"` to the `dataSource` union on `DailyDataTypeDefinition`
(`daily-data-types.tsx`).

### 2b. Per-source Google Health types

Google Health's back-end (`CfhrFramework/GoogleHealth/Models/DailyData.cs`) produces a
Fitbit-sized set of daily metrics: steps, resting heart rate, sleep (minutes asleep / in
sleep period), floors, distance, active/total calories, active minutes (light/moderate/
vigorous), sedentary minutes, HRV, SpO2, breathing rate, heart-rate-zone minutes, VO2max,
body weight/fat, water, nutrition. We do **not** need all of these on day one.

- **Day one (required):** steps, resting heart rate, sleep time — these are the metrics
  the user called out and the ones that feed the "combined" types.
- **Fast follow (natural analogs to existing Fitbit types):** active calories burned,
  total calories, floors, distance, active minutes, SpO2, breathing rate, HRV,
  heart-rate-zone minutes.

Create `src/helpers/daily-data-types/google-health.tsx` (mirroring `google-fit.tsx` /
`fitbit.tsx`): an array of definitions with `simpleAvailabilityCheck("GoogleHealth", ...)`,
reusing existing `labelKey`s (`"steps"`, `"resting-heart-rate"`, `"sleep-time"`, etc.) and
formatters. Set `def.dataSource = "GoogleHealth"`. Add matching `DailyDataType` enum
entries (`GoogleHealthSteps`, `GoogleHealthRestingHeartRate`, `GoogleHealthSleepMinutes`,
...). Register the array in `all.ts`.

Create the providers in `daily-data-providers/` and export them from `index.ts`
(`google-health-steps.ts`, `google-health-resting-heart-rate.ts`, `google-health-sleep.ts`,
...). All Google Health data is **V2** (`queryDeviceDataV2` / `queryForDailyDataV2` /
`queryAllDeviceDataV2Aggregates`), like the Health Connect providers.

### Google Health V2 type mapping (researched from the Consumers back-end)

The queryable V2 `type` string for a given metric is the back-end `RealtimeTypeName`,
which is derived deterministically in `CfhrFramework/GoogleHealth` as follows:

- **S3/type prefix per request provider** (`GoogleHealthRequestProvider.cs`):
  - List provider → `{dataType}-list`
  - Daily-rollup provider → `{dataType}-daily` (all sources) or `{dataType}-daily-tracker`
    (tracker/wearable only)
- **Type name per query factory** (`GoogleHealthQueries.cs`):
  - daily-rollup query → `{s3}` (e.g. `steps-daily`)
  - daily-"list" query → `{s3}-{alias ?? valueJPath}` (e.g. `dailyRestingHeartRate-list-beatsPerMinute`)
  - sleep-session-metric query → `{s3}-session-{metricName}` (s3 = `sleep-list`)
  - sample/interval query → `{s3}`

Applying that to the three required metrics:

| Metric | Namespace | V2 `type` | Shape | Provider approach |
|---|---|---|---|---|
| **Steps** (daily total) | `GoogleHealth` | `steps-daily` (also `steps-daily-tracker`) | pre-rolled, 1 value/day | `queryForDailyDataV2` + `buildMostRecentValueResult` — identical to `health-connect-steps.ts` |
| **Resting heart rate** | `GoogleHealth` | `dailyRestingHeartRate-list-beatsPerMinute` | pre-daily list, 1 value/day | `queryForDailyDataV2` + `buildMostRecentValueResult` — **no aggregate query needed** (unlike Health Connect RHR, which must `avg` because it's sample-based) |
| **Sleep time** (minutes asleep) | `GoogleHealth` | `sleep-list-session-asleep` | per **session**, multiple/day | `queryAllDeviceDataV2Aggregates` with `aggregateFunctions: ["sum"]`, `intervalType: "Days"` → daily total; or query raw + `buildTotalValueResult` |

Notes:
- Use `steps-daily` (all sources) for the combined/steps providers, not the
  `-daily-tracker` variant (that excludes phone step data).
- For sleep, `sleep-list-session-asleep` = minutes actually asleep;
  `sleep-list-session-inSleepPeriod` = time in the sleep period (closer to "in bed").
  Match `SleepMinutes` to `-asleep` to stay consistent with the other sources' "sleep
  time". Because a day can contain several sleep sessions (naps + main sleep), summation
  is required — this is the one metric that needs an aggregate/rollup step.

Fast-follow metrics resolve by the same rule, e.g. active calories burned
`activeEnergyBurned-daily`, total calories `totalCalories-daily`, floors `floors-daily`,
distance `distance-daily` (millimeters — needs unit conversion), sedentary
`sedentaryPeriod-daily`, SpO2 `dailyOxygenSaturation-list-avg`, breathing rate
`dailyRespiratoryRate-list-breathsPerMinute`, HRV `dailyHeartRateVariability-list-averageRmssd`,
heart-rate avg/max/min `heartRate-daily-avg|-max|-min`.

> These strings should be spot-checked against the SDK's `getDeviceDataV2AllDataTypes()`
> output for a Google-Health-connected participant once the SDK ships, in case the type
> registry renames anything.

### 2c. Wire Google Health into the combined ("Unified") types

The combined types are the real payoff — one configured graph draws from every connected
source. Add Google Health as a source to the three called-out metrics (and, as fast
follow, active calories burned):

- **`combined.tsx`** — add `["GoogleHealth", "steps-daily"]` to `STEPS_SOURCES` (and
  `STEPS_WITH_GOOGLE_FIT_SOURCES`), `["GoogleHealth", "dailyRestingHeartRate-list-beatsPerMinute"]`
  to `RESTING_HEART_RATE_SOURCES`, and `["GoogleHealth", "sleep-list-session-asleep"]` to
  `SLEEP_MINUTES_SOURCES`.
- **`combined-steps.ts`, `combined-resting-heart-rate.ts`, `combined-sleep.ts`** — add a
  `settings.googleHealthEnabled && <type present>` branch that pushes the corresponding
  Google Health provider, matching the existing per-source branches.

Because `combined-steps`/`combined-sleep` merge with `combineResultsUsingMaxValue` and
`combined-resting-heart-rate` with rounded-average, adding Google Health as one more
source needs no new merge logic. (Consider whether averaging RHR across Fitbit **and**
Google Health on days both report is desirable, or whether a source preference is better —
see Effort 3, which argues for per-day preference rather than blending.)

### What the "combined" types are

For reference, the shared metrics that already exist and that Google Health can
contribute to: **Steps, Resting Heart Rate, Sleep Minutes** (the three requested),
plus **Active Calories Burned** (Google Health reports it), and **Mindful/Therapy
Minutes** (Google Health does **not** report these — leave as-is).

---

## Effort 3 — Fitbit backwards compatibility

**Goal:** a graph already configured with a Fitbit metric (e.g. `FitbitSteps`) must keep
working and, if Fitbit stops sending data while Google Health is connected, automatically
show the Google Health value — without anyone editing the graph config.

### Recommended approach: Fitbit-preferred / Google-Health-fallback at the Fitbit type

Keep the `DailyDataType.Fitbit*` enum keys **unchanged** (so stored configs still
resolve), but change the *provider* and *availability check* for the Fitbit metrics that
have a Google Health analog (Steps, Resting Heart Rate, Sleep, and the fast-follow
analogs) so they merge `[fitbitProvider, googleHealthProvider]` using
**`combineResultsUsingFirstValue`**. Because that helper takes, per day, the first result
that has data, ordering the array `[fitbit, googleHealth]` yields exactly "use Fitbit when
present, otherwise Google Health" — no blending, no double counting, and days where
Fitbit still reports are unchanged. The availability check becomes the OR of Fitbit and
Google Health (reuse the `sources(...)` + `combinedAvailabilityCheck` machinery instead of
`simpleAvailabilityCheck`).

Concretely, for each affected Fitbit type in `fitbit.tsx`:
- swap `dataProvider` from e.g. `fitbitStepsDataProvider` to a small combined provider
  that runs Fitbit + (if `googleHealthEnabled` and type present) Google Health and merges
  first-value;
- swap `availabilityCheck` from `simpleAvailabilityCheck("Fitbit", [...])` to
  `combinedAvailabilityCheck(sources(["Fitbit", ...], ["GoogleHealth", ...]))`.

This is transparent to existing configs and satisfies the requirement precisely. The only
semantic change is that a "Fitbit steps" graph may now show Google Health values on days
Fitbit is silent — which is the desired behavior. Labels are already generic
(`"steps"`, not "Fitbit steps"), so no copy changes are needed.

Guard every fallback on `settings.googleHealthEnabled` so participants who never connect
Google Health see identical behavior to today.

### Alternatives considered

- **Redirect Fitbit types to the combined types.** Simpler conceptually, but existing
  graphs pinned to `FitbitSteps` would need config migration to benefit, so it does not
  meet "the existing graph keeps working" transparently. The combined types (Effort 2c)
  already cover *new* configs; Effort 3 exists specifically for *legacy Fitbit-pinned*
  configs.
- **Blend (max/average) Fitbit + Google Health.** Rejected: max would over-report steps
  if both briefly report the same day from overlapping wear, and averaging RHR across two
  ecosystems is not meaningful. Per-day first-value preference is cleaner.

### Scope of Effort 3

Apply the fallback to the Fitbit types with a genuine Google Health equivalent (steps,
resting heart rate, sleep total, and the fast-follow analogs). Fitbit-only metrics with no
Google Health equivalent stay exactly as they are.

---

## Suggested sequencing

1. **Gate on the SDK release** (namespace + `googleHealthEnabled`). Bump
   `@careevolution/mydatahelps-js`.
2. **Effort 1** (menu) — smallest, independently shippable once the provider ID and SDK
   flag are known.
3. **Effort 2** (Google Health daily data types + combined wiring) — start with steps,
   resting heart rate, sleep; then the fast-follow analogs.
4. **Effort 3** (Fitbit fallback) — depends on Effort 2's Google Health providers +
   availability sources existing.
5. Tests/stories: add Google Health preview data to `ConnectDevicesMenu.stories.tsx`, and
   unit tests for the combined providers and the new Fitbit fallback providers following
   the existing `__tests__` patterns for daily data providers.

## Files that will change (summary)

- `src/components/container/ConnectDevicesMenu/ConnectDevicesMenu.tsx` (+ `.previewdata.ts`, `.stories.tsx`)
- `src/helpers/providerIDs.ts`
- `src/assets/googlehealth-logo.*` (new)
- `src/helpers/daily-data-types.tsx` (enum + `dataSource` union)
- `src/helpers/daily-data-types/google-health.tsx` (new), `all.ts`, `combined.tsx`
- `src/helpers/daily-data-types/fitbit.tsx` (Effort 3)
- `src/helpers/daily-data-providers/data-collection-helper.ts` (`enabledFlags`)
- `src/helpers/daily-data-providers/google-health-*.ts` (new), `index.ts`
- `src/helpers/daily-data-providers/combined-steps.ts`, `combined-resting-heart-rate.ts`, `combined-sleep.ts` (+ optionally `combined-active-calories-burned.ts`)

---

## Appendix A — Complete Google Health V2 type catalog

Every queryable `GoogleHealth` V2 `type` string, derived from the back-end
`FetchingPlan.FetchRules` (`GoogleHealthFetchRules.cs`) and the type-name formulas in
`GoogleHealthQueries.cs`. Cadence legend: **D** = daily rollup (`*-daily`, one value/day,
plus a `*-daily-tracker` wearable-only twin where noted); **DL** = daily list (civil-date,
one value/day); **I** = intraday interval; **S** = sample (intraday point); **Se** =
session (0..n/day, aggregatable); **U** = user/static config. Only D/DL (and summed Se)
are directly usable as daily data types.

| Back-end DataType | V2 type string(s) | Cadence |
|---|---|---|
| ActiveEnergyBurned | `activeEnergyBurned-list` / `activeEnergyBurned-daily`(+`-tracker`) | I / **D** |
| ActiveMinutes | `activeMinutes-list-{light,moderate,vigorous}` / `activeMinutes-daily-{light,moderate,vigorous}`(+`-tracker`) | I / **D** |
| ActiveZoneMinutes | `activeZoneMinutes-list-{fat-burn,cardio,peak}` / `activeZoneMinutes-daily-{fat-burn,cardio,peak}` | I / **D** |
| ActivityLevel | `activityLevel-list` (categorical) | I |
| Altitude | `altitude-list` / `altitude-daily`(+`-tracker`) | I / **D** |
| BloodGlucose | `bloodGlucose-list` / `bloodGlucose-daily` (avg) | S / **D** |
| BodyFat | `bodyFat-list` / `bodyFat-daily`(+`-tracker`) | S / **D** |
| CaloriesInHeartRateZone | `caloriesInHeartRateZone-daily-{light,moderate,vigorous,peak}` | **D** |
| CoreBodyTemperature | `coreBodyTemperature-list` / `coreBodyTemperature-daily-{avg,max,min}` | S / **D** |
| DailyHeartRateVariability | `dailyHeartRateVariability-list-{averageRmssd,nonRemHeartRate,entropy,deepSleepRmssd}` | **DL** |
| DailyHeartRateZones | `dailyHeartRateZones-list-{light,moderate,vigorous,peak}-{min,max}` | **DL** |
| DailyOxygenSaturation | `dailyOxygenSaturation-list-{avg,lower,upper,stddev}` | **DL** |
| DailyRespiratoryRate | `dailyRespiratoryRate-list-breathsPerMinute` | **DL** |
| DailyRestingHeartRate | `dailyRestingHeartRate-list-beatsPerMinute` | **DL** |
| DailySleepTemperatureDerivations | `dailySleepTemperatureDerivations-list-{nightly,baseline,relativeStddev}` | **DL** |
| DailyVo2Max | `dailyVo2Max-list-{cardioFitnessLevel,vo2Max,vo2MaxCovariance}` | **DL** |
| Distance | `distance-list` / `distance-daily`(+`-tracker`) | I / **D** |
| Electrocardiogram | `electrocardiogram-list`, `electrocardiogram-list-waveformSamples` | S |
| Exercise | `exercise-list-session`, `exercise-list-session-{calories,distance,steps,averageSpeed,averagePace,averageHeartRate,elevationGain,activeZoneMinutes,runVo2Max,totalSwimLengths,heartRateZoneDurations-*Time,mobilityMetrics-*}`, `exercise-list-events`, `exercise-list-splits` | Se |
| Floors | `floors-reconcile` / `floors-daily`(+`-tracker`) | I / **D** |
| HeartRate | `heartRate-list` / `heartRate-daily-{avg,max,min}` | S / **D** |
| HeartRateVariability | `heartRateVariability-list-{rmssd,stddev}` | S |
| Height | `height-list` | S |
| HydrationLog | `hydrationLog-list` / `hydrationLog-daily` | Se / **D** |
| IrregularRhythmNotification | `irregularRhythmNotification-list` | Se |
| NutritionLog | `nutritionLog-list-session` / `nutritionLog-daily-{energy,energyFromFat,totalCarbohydrate,totalFat}` | Se / **D** |
| OxygenSaturation | `oxygenSaturation-list` | S |
| PairedDevices | `pairedDevices` | U |
| Profile | `profile-{age,membershipStartDate,autoRunningStrideLengthMm,autoWalkingStrideLengthMm,userConfiguredRunningStrideLengthMm,userConfiguredWalkingStrideLengthMm}` | U |
| RespiratoryRateSleepSummary | `respiratoryRateSleepSummary-list-{deep,light,rem,full}` | S (per sleep) |
| RunVo2Max | `runVo2Max-list` / `runVo2Max-daily-{min,avg,max}` | S / **D** |
| SedentaryPeriod | `sedentaryPeriod-list` / `sedentaryPeriod-daily`(+`-tracker`) | I / **D** |
| Settings | `settings-{autoStrideEnabled,distanceUnit,glucoseUnit,heightUnit,languageLocale,strideLengthRunningType,strideLengthWalkingType,swimUnit,temperatureUnit,timeZone,utcOffset,waterUnit,weightUnit}` | U |
| Sleep | `sleep-list-session`, `sleep-list-session-{inSleepPeriod,afterWakeUp,toFallAsleep,asleep,awake}`, `sleep-list-stages`, `sleep-list-stages-summary-{awake,light,deep,rem}-{minutes,count}`, `sleep-list-out-of-bed` | Se (sum→daily) |
| Steps | `steps-list` / `steps-daily`(+`-tracker`) | I / **D** |
| SwimLengthsData | `swimLengthsData-list` / `swimLengthsData-daily` | I / **D** |
| TimeInHeartRateZone | `timeInHeartRateZone-list` / `timeInHeartRateZone-daily-{light,moderate,vigorous,peak}` | I / **D** |
| TotalCalories | `totalCalories-daily`(+`-tracker`) | **D** |
| Vo2Max | `vo2Max-list` | S |
| Weight | `weight-list` / `weight-daily`(+`-tracker`) | S / **D** |

> The set a given participant/project actually exposes is whatever
> `getDeviceDataV2AllDataTypes()` reports as enabled — treat this catalog as the superset.

## Appendix B — Candidate daily data types

### B1. Feed existing metrics (combined sources + Fitbit fallback) — do these first

These have a direct analog already in the daily-data system, so Google Health just becomes
another source (Effort 2c) and a Fitbit fallback (Effort 3):

| Existing metric | Google Health V2 type |
|---|---|
| Steps | `steps-daily` |
| Resting heart rate | `dailyRestingHeartRate-list-beatsPerMinute` |
| Sleep time (total) | `sleep-list-session-asleep` (sum/day) |
| Active calories burned | `activeEnergyBurned-daily` |
| Calories burned (total) | `totalCalories-daily` |
| Floors climbed | `floors-daily` |
| Distance | `distance-daily` (millimeters → convert) |
| Breathing/respiratory rate | `dailyRespiratoryRate-list-breathsPerMinute` |
| HRV | `dailyHeartRateVariability-list-averageRmssd` |
| SpO2 | `dailyOxygenSaturation-list-avg` |
| Light/REM/Deep sleep minutes | `sleep-list-stages-summary-{light,rem,deep}-minutes` (sum/day) |
| Sedentary minutes | `sedentaryPeriod-daily` |
| Active minutes (light/moderate/vigorous ≈ lightly/fairly/very) | `activeMinutes-daily-{light,moderate,vigorous}` |
| Fat-burn/Cardio/Peak HR-zone minutes | `activeZoneMinutes-daily-{fat-burn,cardio,peak}` |
| Max/Min/Avg heart rate | `heartRate-daily-{max,min,avg}` |

### B2. Net-new daily data types Google Health enables (not currently modeled)

Worth adding as new `DailyDataType`s (Google-Health-specific or as future combined
metrics as other sources catch up):

- **VO2 Max / cardio fitness** — `dailyVo2Max-list-vo2Max`, `dailyVo2Max-list-cardioFitnessLevel`
- **Body weight** — `weight-daily`
- **Body fat %** — `bodyFat-daily`
- **Blood glucose (daily avg)** — `bloodGlucose-daily`
- **Hydration (water volume)** — `hydrationLog-daily`
- **Nutrition** — `nutritionLog-daily-energy` (calories in), `-totalCarbohydrate`, `-totalFat`
- **Skin/core body temperature** — `coreBodyTemperature-daily-avg`
- **Sleeping skin temperature deviation** — `dailySleepTemperatureDerivations-list-nightly` / `-relativeStddev`
- **Sleep sub-metrics** — time in bed (`sleep-list-session-inSleepPeriod`), sleep latency (`sleep-list-session-toFallAsleep`), awake time (`sleep-list-session-awake` / `sleep-list-stages-summary-awake-minutes`)
- **Calories in HR zone** — `caloriesInHeartRateZone-daily-{light,moderate,vigorous,peak}`
- **Time in HR zone** (alt to active-zone-minutes) — `timeInHeartRateZone-daily-*`
- **Altitude / elevation gain** — `altitude-daily`
- **Swim stroke count** — `swimLengthsData-daily`
- **Daily HR zone min/max bounds** — `dailyHeartRateZones-list-*-{min,max}`

### B3. Not daily-data material

Intraday/sample series (`heartRate-list`, `oxygenSaturation-list`, `electrocardiogram-*`,
`vo2Max-list`, `height-list`), session detail (`exercise-*`, `irregularRhythmNotification-list`),
and user/config (`profile-*`, `settings-*`, `pairedDevices`) — useful for detail views,
exercise/session components, or config, but not day-granular chartable metrics.
