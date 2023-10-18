---
title: Models
---

Our Models is used to represent a table in our application. It is built using the Objection.js library (https://vincit.github.io/objection.js/), which provides a convenient and powerful way to interact with our database.

### Model Definition

Example

The Tenant model is defined in the `Tenant.js` file. Here is an example of the Tenant model definition:

```javascript
"use strict";

import objection from "objection";
import { UIConfig } from "./ui-config.js";

const { Model } = objection;

export class Tenant extends Model {

  static get tableName() {
    return "tenant";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["tenant_name", "tenant_code", "recording_system", "send_to_url", "time_zone_name"],
      properties: {
        id: { type: "integer" },
        tenant_code: { type: "string", minLength: 5, maxLength: 5 },
        tenant_name: { type: "string", minLength: 1, maxLength: 255 },
        open_time: { type: "string", maxLength: 5 },
        close_time: { type: "string", maxLength: 5 },
        recording_system: { type: "string", minLength: 1, maxLength: 255 },
        send_to_url: { type: "string", minLength: 1, maxLength: 255 },
        send_to_username: { type: "string", maxLength: 255 },
        send_to_password: { type: "string", maxLength: 255 },
        active: { type: "boolean" },
        time_zone_name: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }

  static get relationMappings() {
    return {
      uiConfig: {
        relation: Model.HasManyRelation,
        modelClass: UIConfig,
        join: {
          from: "tenant.id",
          to: "ui_config.tenant_id"
        }
      }
    };
  }
}
```

### Explanation of the Model

The `Tenant` model has several properties, each with its own validation rules:

- `id`: An integer that uniquely identifies each tenant.
- `tenant_code`: A string of exactly 5 characters that represents the tenant's code.
- `tenant_name`: A string of 1 to 255 characters that represents the tenant's name.
- `open_time` and `close_time`: Strings of up to 5 characters representing the tenant's operating hours.
- `recording_system`: A string of 1 to 255 characters representing the tenant's recording system.
- `send_to_url`: A string of 1 to 255 characters representing the URL to which data should be sent.
- `send_to_username` and `send_to_password`: Strings of up to 255 characters representing the credentials for the `send_to_url`.
- `active`: A boolean indicating whether the tenant is active.
- `time_zone_name`: A string of 1 to 255 characters representing the tenant's time zone.

The `Tenant` model also has a relation mapping to the `UIConfig` model, indicating that a tenant can have many UI configurations.

### Example

Here's an example of how to create a new `Tenant` instance:

```javascript
const newTenant = await Tenant.query().insert({
  tenant_code: 'T1234',
  tenant_name: 'Tenant 1',
  open_time: '08:00',
  close_time: '17:00',
  recording_system: 'System 1',
  send_to_url: 'http://example.com',
  send_to_username: 'user',
  send_to_password: 'password',
  active: true,
  time_zone_name: 'UTC'
});
```

This will create a new tenant in the database with the provided details.