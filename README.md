# MyDataHelpsUI

MyDataHelpsUI is a set of reusable React-based components based on the [MyDataHelps.js SDK](https://developer.mydatahelps.org/sdk/). Explore the component library at [ui.mydatahelps.org](https://ui.mydatahelps.org/).

Utilize this component library to accelerate the development of [custom participant views](https://developer.mydatahelps.org/views/) for your digital clinical trial and digital therapeutic application powered by [MyDataHelps platform](https://careevolution.com/mydatahelps/). Integrating MyDataHelpsUI will help you follow best practices for implementing return of results and eCOA within your participant views.

You may also find [MyDataHelpsStarterKit](https://github.com/CareEvolution/MyDataHelpsStarterKit) to be helpful. The starter kit is a react web app template designed for you to be able to fork/clone as a starting point for developing your custom view.

Install via:

```npm install @careevolution/mydatahelps-ui```

### Example of how to use MyDataHelpsUI in your Participant View
```
import { Action, Card, Layout, SurveyTaskList } from "@careevolution/mydatahelps-ui"

export default function () {
  return (
    <Layout>
        <Card className='primary-card'>
            <Action
            title="Do you think you have COVID-19?"
            subtitle="It's important to tell us immediately if might have COVID-19.  Click or tap here to report a new infection, symptoms, or close contact."
            onClick={() => MyDataHelps.startSurvey('New COVID Infection')} />
        </Card>
        <Card>
            <SurveyTaskList status="incomplete" title="Tasks" limit={3} />
        </Card>
    </Layout>
    );
```


[© CareEvolution, LLC](https://developer.mydatahelps.org)

## Storybook

This library uses [Storybook](https://storybook.js.org/). To look at examples, visit [ui.mydatahelps.org](https://ui.mydatahelps.org/).

To run Storybook previews with data from one of your test MyDataHelps participants:

1. Clone this repo
2. Get a [participant access token](https://developer.mydatahelps.org/sdk/participant_tokens.html) - either using browser dev tools while logged in as a test participant at mydatahelps.org, or by using the REST API.
    - Hint: if using browser dev tools, examine the response on the request to https://mydatahelps.org/identityserver/connect/token.
3. Create a .env file in your root directory with the token details

```
.env
-----
PARTICIPANT_ACCESS_TOKEN=05e211e4df46ca7537e064bde44148a7 
```
4. Run `npm ci` to install dependencies.
5. Run `npm run storybook` to view the storybook.

If you have issues getting storybook to run, particularly around the NODE_OPTIONS being used, try upgrading Node to the latest version.

## Components

The components fall into 3 categories:

### Presentational Components

Presentational components do NOT fetch data to populate themselves.  They are the underlying UI building blocks of the views and connected components.  These are things such as buttons, cards, and a display for a single survey task.

### Container Components

Container components fetch data via the MyDataHelps.js SDK.  These components will only function if used in a view inside MyDataHelps or via manually passing an access token to the SDK.  

### Views

Views pull the sets of Container and Presentational Components together into fully pre-built experiences.  For instance, the "Home View" contains multiple connected components in one:

- ProjectHeader
- MostRecentNotification
- SurveyTaskList
- ProjectSupport