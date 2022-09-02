# MyDataHelpsUI

MyDataHelpsUI is a set of reusable React-based components based on the MyDataHelps.js SDK:
https://github.com/CareEvolution/MyDataHelps.js

Install via:

```npm install @careevolution/mydatahelps-ui```

Utilize the library to integrate components into your [participant views](https://developer.mydatahelps.org/views/). 

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

This library uses Storybook[https://storybook.js.org/].  To look at examples, clone this repository and:

```npm run storybook```

to view the storybook.

To run Storybook previews with the data from one of your test MyDataHelps participants:
1. Obtain a participant access token using the MyDataHelps [JavaScript SDK](https://developer.mydatahelps.org/sdk/participant_tokens.html) 
2. Create a .env file in your root directory with the token details
`
.env
-----
PARTICiPANT_ACCESS_TOKEN=05e211e4df46ca7537e064bde44148a7 
`

If you have issues getting storybook to run, particuarly around the NODE_OPTIONS being used, try upgrading Node to the latest version.

## Components

The components fall into 3 categories:

### Presentational Components

Presentational components do NOT fetch data to populate themselves.  They are the underlying UI building blocks of the views and connected components.  These are things such as buttons, cards, and a display for a single survey task.

### Container Components

Container components fetch data via the MyDataHelps.js SDK.  These components will only function if used in a view inside MyDataHelps or via manually setting an access token into the SDK.  

### Views

Views pull the sets of Container and Presentational Components together into fully pre-built experiences.  For instance, the "Home View" contains multiple connected components in one:

- ProjectHeader
- MostRecentNotification
- SurveyTaskList
- ProjectSupport