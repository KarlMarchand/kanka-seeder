# Kanka Seeder

Kanka Seeder is a Node/TypeScript-based tool for seeding campaigns in [Kanka.io](https://kanka.io/), a world-building and campaign management platform. This project automates the creation of characters, locations, and organizations for various campaigns using the Kanka API.
<br>
It is intended to be used by people with at least a small amount of coding knowledge since you need to code your own seeding logic.


## Features

- Is made to be simple, extendable and customizable. 
- Can easily switch between multiple campaigns using command line arguments.
- Automatically creates characters, locations, and organizations from predefined data.
- Configurable via `.env` file for API keys and rate limit.


## Prerequisites

- Node.js (v16 or later)
- npm or yarn


## Installation

1. Generate an api key following Kanka's instructions [here](https://app.kanka.io/api-docs/1.0/setup).

2. Clone the repository:
   ```
   git clone https://github.com/KarlMarchand/kanka-seeder.git
   cd kanka-seeder

3. Install dependencies
   ```
   npm install

4. Create a .env file in the root directory and add the configurations for the Kanka API
   ```
   API_KEY="idT0...e"
   RATE_LIMIT=90
   ```
   The API Key is necessary but the rate limit is only necessary if you're a paying user and have a bigger limit. Otherwise the default value for the free tier (30) will be applied automatically.


## Usage

Example for the call of cthulhu campaign seeder:
```
npm run coc
```


## Adding New Campaigns

1. Fetch the Id of your campaign. This can be done multiple ways but the simplest one is to go on you're campaign's dashboard and look up in the url. (e.g., `app.kanka.io/w/314087` means that the campaign's id is 314087)
2. Create a new file in the `src/campaigns/` directory (e.g., Pathfinder.ts).
3. Create a class that extends the `CampaignSeeder` class and implement the required `seedCampaign` method and `campaignId` property.
4. Add the new campaign class to the campaigns dictionary in `src/index.ts` on line 20. The key should match the name you provide in the command line argument.
5. (optional) Add a new script to the `package.json` file to make it easier to launch your projects. The argument should match the key you added on step 4.


## Adding more fields at the creation of an entity

1. Add the new fields to the `New[EntityType]` interface. (e.g. To add the html description to the character, I would add "entry" in the `src\types\characters\NewCharacter.ts` interface)
2. Add those new fields in your custom campaign seeder implementations.


## Adding new Endpoints

1. Add the endpoint of the api to the enpoints dictionary in the `KankaClient` class in `src/services/KankaService.ts` file.
3. Create the type required in the `src/types` folder.
4. Add your new public function in the `KankaClient` class and then access it in your custom campaign seeder classes.


## API Rate Limiting

The project uses [Bottleneck](https://www.npmjs.com/package/bottleneck) to handle Kanka's API rate limits. By default, it limits requests to the number per minute for free customers. At this moment, the numbers are 90 for paying customers and 30 for free ones.


## Project Details

- **Programming Language:** TypeScript
- **API Documentation:** [Kanka API Docs](https://app.kanka.io/api-docs/1.0/overview)


## External Dependencies

- [Bottleneck](https://www.npmjs.com/package/bottleneck) for rate-limiting.
- [axios](https://www.npmjs.com/package/axios) for making the api calls easier.
- [dotenv](https://www.npmjs.com/package/dotenv) for reading the `.env` configuration file.
- [ts-node](https://www.npmjs.com/package/ts-node) for starting the project as typescript directly.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## Acknowledgments

- [Kanka.io](https://kanka.io/) for their amazing platform.
