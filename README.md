# DevCamperAPIv001

## filter

- **? = & = & =**
  https://docs.mongodb.com/manual/reference/operator/aggregation/eq/#eq-aggregation
- **[eq]** _(equivalent)_
- **[gt]** _(greater than)_
- **[gte]** _(greater than or equivalent)_
- **[in]** _(includes)_
- **[lt]** _(less than)_
- **[lte]** _(less than or equivalent)_

## select

- **select=name,description**
  https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre

## sort

- **sort=-createdAt** _(default)_
- **sort=name**
- **sort=-name**

## pagination

- **limit=2** _(per page)_
- **page=2**

# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own

## Install Dependencies

```bash
npm install
```

## Run App

```bash
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```bash
# Destroy all data
node seeder -d

# Import all data
node seeder -i
```

## Demo

The API is live at [devcamper.io](https://devcamper.io)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/8923145/SVtVVTzd?version=latest)

- Version: 1.0.0
- License: MIT
- Author: Brad Traversy
