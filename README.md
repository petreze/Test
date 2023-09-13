# run `pnpm install`
# then `yarn start` and a react app should start on http://localhost:3000/
# then press `Test` button and observe the behaviour

# you will also need to change this line https://github.com/hashgraph/hedera-sdk-js/blob/develop/src/channel/WebChannel.js#L60 to `http://${this._address}/proto.${serviceName}/${method.name}` in the node modules of the project or clone the SDK and then link it locally to the react web app
