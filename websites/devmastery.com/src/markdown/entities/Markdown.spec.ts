import { FullText } from "../../common/entities";
import { Markdown } from "./Markdown";

describe("Markdown", () => {
  it("Converts markdown to HTML.", () => {
    const md = getMarkdownText();

    const markdown = Markdown.from(FullText.of(md));
    expect(markdown.toHTML()).toMatchSnapshot();
  });

  it("Converts markdown to plain text.", () => {
    const md = getMarkdownText();

    const markdown = Markdown.from(FullText.of(md));
    expect(markdown.toPlainText()).toMatchSnapshot();
  });

  it("Handles Images.", () => {
    const mdImage =
      "# Image in Markdown" +
      "\n" +
      "![an image](https://some.url/bigImage.jpg?q=75&w=3140&h=2160)";

    const markdown = Markdown.from(FullText.of(mdImage));

    expect(markdown.toHTML()).toMatchSnapshot();
  });

  it("Handles YouTube videos.", () => {
    const mdYoutube =
      "# Youtube video in Markdown" +
      "\n" +
      "![a video](https://youtu.be/xCZQIKyi1Io?w=3140&h=2160)";

    const markdown = Markdown.from(FullText.of(mdYoutube));

    expect(markdown.toHTML()).toMatchSnapshot();
  });
});

function getMarkdownText() {
  return `# Dillinger
## _The Last Markdown Editor, Ever_

Dillinger is a cloud-enabled, mobile-ready, offline-storage compatible,
AngularJS-powered HTML5 Markdown editor.
  
- Type some Markdown on the left
- See HTML in the right
- ✨Magic ✨
  
## Features
  
- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF
  
Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]
  
> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.
  
This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.
  
## Tech

Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
to Markdown converter
- [jQuery] - duh
  
And of course Dillinger itself is open source with a [public repository][dill] on GitHub.

## Installation
  
Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.
  
Install the dependencies and devDependencies and start the server.
  
\`\`\`sh
  cd dillinger
  npm i
  node app
\`\`\`
  
For production environments...
  
\`\`\`sh
  npm install --production
  NODE_ENV=production node app
\`\`\`
  
## Plugins
  
Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.
  
| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

## Development
  
Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!
 
[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
  
   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>`;
}
