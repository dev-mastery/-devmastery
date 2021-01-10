---
author: Bill Sourour
datePublished: December 28, 2017
image: wisdom-temp.jpg
imageDescription: A statue of the buddha in a garden
category: Articles
summary: When I was starting out, I got some solid advice that was ahead of its time. Now, I'll share it with you.
tags:
  - JAMStack
  - comments
  - practices
  - programming
  - software
  - static site generators
title: Don’t do it at runtime. Do it at design time.
topic: Design time vs runtime
type: Post
---

Long ago a wise old developer gave me a piece of advice that I didn’t fully appreciate until very recently.

We were in a code review looking at some feature that required the program to output a list of letters from A-Z (think of a list of contacts with a set of buttons that allow you to skip down to names starting with a certain letter — that kind of thing).

So, along came some young hot-shot. (OK — it was me.) I decided that rather than just hard-coding an array of all the letters, it would be easier to write a for loop that iterated from 65–90, then use the values to generate the letters from their char codes.

The JavaScript equivalent would be something like:

```js
for (let i = 65; i <= 90; i++) {
  letters.push(String.fromCharCode(i));
}
```

The wise old developer looked at me and asked why I hadn’t just hard-coded the array. It wasn’t as if the alphabet was going to be different from one session to the next. So why bother calculating it every time?

I was aghast. “You can’t really expect me to hand type every single letter like some child. I am a professional software developer! I have algorithms and data structures, and a math co-processor for heaven’s sake!”

“Fine,” he said. “Then use them at design-time to generate the array for you, and then copy/paste it into the production code.”

And then he said this:

> “Avoid doing at runtime what you can do at design&nbsp;time”

Now, let’s be honest. My little for-loop wasn’t about to bring the application to a grinding halt. And today’s machines would crunch through that code so fast, no one would even notice. But as a general principle, it’s sage advice.

Too often we write code that transforms rarely-changing data from one format to another on every request.

Think of all the round-trips to fetch a piece of content from a database that might change once or twice a year, format it, and forward it to the browser, needlessly slowing down our apps.

This is especially true for sites that are tied to a content management system.

This is why I think established players like Wordpress, Drupal, and the like will face a credible challenge in the years to come from static site generators like [Gatsby](https://www.gatsbyjs.org), [Hugo](https://gohugo.io), or [Jekyll](https://jekyllrb.com) paired with a smooth build process, [headless CMS](https://css-tricks.com/what-is-a-headless-cms/), cheap CDNs, and a fast continuous integration workflow.

This pattern has been dubbed [JAMstack](https://jamstack.org), which stands for “JavaScript, APIs and Markup stack.” And the [results are quite impressive](https://jamstack.org/examples/).

The wise old developer’s advice echoes in my ears: “Avoid doing at run-time what you can do at design time.” And as time has worn on, I’ve realized that this piece of advice has far-reaching implications. Not just for software development, but for life too.

Recently, I’ve been reading a great book called [“Principles: Work and Life” by Ray Dalio](https://www.principles.com). A central theme of the book is that there are far fewer _types_ of problem than there are _actual_ problems. So if you do the work ahead of time and figure out how you would approach a particular type of problem you’re likely to face, then when it does arrive, you’ll be far better equipped to deal with it.

In essence, you can make better decisions more quickly by sorting out your approach to different problem types at “design time”, when you’re calmly reflecting on life, instead of at “runtime”, when you’re faced with an actual problem in the moment and panicking.

Dalio implemented this technique by cataloging his approaches as a set of principles. He even went so far as to codify his decision-making process into a set of computer algorithms that he could test against vast amounts of historical data.

Given that he’s a multi-billionaire who runs a very successful investment company, I’d say it’s worked out.

In fact, [Wall Street is starting to hire more computer programmers than stock traders](https://www.nytimes.com/2016/02/23/business/dealbook/a-new-breed-of-trader-on-wall-street-coders-with-a-phd.html). So if you had any doubts that you chose the right profession, there’s more proof that software is eating the world.

I shared my own advice and lessons-learned in a recent interview on the Developer On Fire podcast which you can listen to [here](https://dev.to/developeronfire/episode-299--bill-sourour--paying-it-forward).

[ **Episode 299 | Bill Sourour - Paying It Forward**](https://dev.to/developeronfire/episode-299--bill-sourour--paying-it-forward)

You can learn more about JAMstack at Jamstack.org

[ **JAMstack | JavaScript, APIs, and Markup**](http://www.JAMstack.org)

There’s also a nice round-up of static site generators on the Netlify blog at:

[ **Top Ten Static Site Generators of 2017 | Netlify**](https://www.netlify.com/blog/2017/05/25/top-ten-static-site-generators-of-2017/)

And here’s an article about a specific stack that I recently reviewed and recommended which uses a combination of Gatsby, Contentful, Netlify, and Algolia as an alternative to a traditional CMS for a documentation site:

[**Gatsby + Contentful + Netlify (and Algolia)**](https://www.gatsbyjs.org/blog/2017-12-06-gatsby-plus-contentful-plus-netlify/)

This post originally appeared in the **Dev Mastery Newsletter** which I send out regularly to thousands of developers all over the world. Sign up below to get more content like this sent straight to your inbox.
