## Installation

```bash
git clone https://github.com/khawerrind/create-react-app-redux.git
cd create-react-app-redux
yarn
```

## Get started

```bash
yarn start
```

NOTE: The Node express server must the CORS enabled in order for the preflight requests to work. 

```javascript
const express = require('express');
var cors = require('cors');

const app = express();
app.use(cors());
```
