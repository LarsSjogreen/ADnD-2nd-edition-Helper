# ADnD-2nd-edition-helper

Just goofing around, implementing (very small parts of) the AD&D 2nd edition Players Handbook rules for creating a character.

## Development philosophy
Move fast, break things. Settle with good enough or worse. (See [The Cult of done manifesto](http://www.manifestoproject.it/bre-pettis-and-kio-stark/).)

## Things to do in near time
- [ ] Make the web page look more nicer
- [ ] Add a menu to the web page

## Done
- [x] Add a csv file reader that can be used for adding attribute bonuses

## Ideas for the future
- [ ] NPC generator
- [ ] Using Buefy or other framework to make it look a bit nicer
- [ ] PDF generator for character sheet
- [ ] Treasure-, dungeon- and other generator tables

## Purpose of this project
Happy coding therapy. The software will (and should) probably never be used.

## To use the project
```node index.js```

## To develop
You need Compass to run Grunt. First install Ruby, then install compass like this: ```gem install compass```
Activate Chrome reload in your web browser to get automatic reload of sass/HTML changes (together with ```grunt watch```)
