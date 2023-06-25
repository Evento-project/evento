# Evy

# Install
```
yarn
```
For front-end app
```
cd frontend
yarn
cp .env.local .env # dont forget to edit your environment keys
yarn run dev

# Stack
Unlock Protocol
World ID
Subgraph
Eventbrite


# Description
This project is a simple widget-like presence that links offline events and cryptocurrency payments through the Unlock Protocol. You first log in with your Web3 wallet and then on the main page, there is a button that allows you to directly open your Eventbrite account for authorization. After returning to the Evy application interface, you will see your event information and a button on the information card to generate a unique cryptocurrency payment method for this event. After few clicks to fill out the blockchain payment info, your web3 wallet is called for signature authentication, and the payment channel information is recorded on the blockchain. A payment link is also generated, so the user can enter the beautiful checkout page created by the Unlock Protocol with just one click.

# How it is made
Evy uses Unlock Protocol and WorldID's human verification technology, as well as Eventbrite's developer API for its rich event information. By calling the Eventbrite OAuth login authorization, it retrieves a list of events that you created, and customizes a set of Unlock Protocol smart contracts that can be uploaded to the Polygon blockchain within two minutes based on the description of your event. A crypto payment link is generated and returned to be updated in your event information. If a human verification is required, WorldID's human verification technology verifies your iris and you can easily confirm this in the World app on your phone. The rich Unlock protocol and convenient checkout link plus the speed of Polygon fulfilled the experience. WorldId provided a level of security on top of that too.  
