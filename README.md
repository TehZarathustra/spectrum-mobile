# spectrum front-end
make sure that you have [node.js](https://nodejs.org/en/) and [ruby](https://www.ruby-lang.org/en/downloads/) installed

# Install (only once)
open your terminal and type these:

1. `gem install sass`
2. `npm install -g gulp`
3. `npm install -g bower`
4. `git clone https://github.com/TehZarathustra/spectrum.git your_directory`

# Run it
1. `cd your_directory`
2. `npm install`
3. `gulp`

it will automatically start watching for `css` and `js`, to stop it press `ctrl + c`

# Build
to make production version (minified and concatinated)
```
gulp deploy
```
it will create `dist/` folder in the same directory with `app/`
