---
author: Bill Sourour
datePublished: April 3, 2017
image: style.png
category: Articles
summary: "Tabs or spaces? Curly brace on the same line or a new line? 80 character width or 120? This is the definitive answer you've been looking for."
tags: ["programming", "software", "comments", "practices"]
title: The 100% correct coding style guide
topic: Writing better code
---

Tabs or spaces? Curly brace on the same line or a new line? 80 character width or 120?

Coders love to argue about this kind of stuff. The tabs vs. spaces debate even made it into a famous episode of the HBO show Silicon Valley.

Well in this article, **I will finally give you the definitive answers you seek.**

Early in my career, I engaged in all kinds of holy wars. I would read some article about why a particular convention was correct, while another was totally wrong. I would get right up there on my high and mighty horse and proclaim to anyone who would listen that they were wrong and I was right.

![](the-100-percent-correct-coding-style-guide/pedant.png?w=1170&h=316)

It took me years to find the right answers but I’ve finally done it and it turns out the answer is…

**These things don’t matter.**

Consistency matters. Readability matters. Arguing and stressing about one convention over another matters not.

Over the past 20+ years, I’ve followed every imaginable trend. I’ve followed the different conventions of different languages. None of it has impacted my bug count or made my code any more efficient.

![](the-100-percent-correct-coding-style-guide/two-types-of-people.png?w=426&h=300)

Don’t get me wrong, clean-looking, well-formatted code will be easier to change and maintain over time, and that’s a good thing.

There’s also nothing wrong with wanting your code to look beautiful. But too often, this is used to justify what essentially boils down to procrastination.

We procrastinate like this because coding is hard. Things can get complicated in a hurry and we — especially those of us who may be new to this level of complexity — can become intimidated by this complexity and grow insecure about our ability to tame it.

It’s much safer to argue over trivial things. Our perceived incompetence is less likely to be exposed that way.

The phenomena of debating trivialities to avoid hard problems is so common that there are a number of popular theories that describe it.

One of the most popular is Parkinson’s Law of Triviality which states that members of an organization give disproportionate weight to trivial issues.

In illustrating this law, Parkinson used the fictional example of a committee whose job it was to approve plans for a new nuclear plant, but who spent the majority of their time arguing over what materials to use for the staff bike shed. They neglected the proposed design of the plant itself, which was a far more important but also far more complex issue.

Because of the reference to a bike shed in this canonical example, Danish developer, Poul-Henning Kamp later coined the term “bike shed effect” or simply “bike shedding” to describe it.

If you work in software development — and especially if you hang out with other coders on social media — you’re likely to come across some form of bike-shedding almost daily.

![](the-100-percent-correct-coding-style-guide/bike-shedding.png?w=1098&h=176)
![](the-100-percent-correct-coding-style-guide/bike-shed.jpg?w=1600&h=1200)

If you find yourself getting into an unusually heated debate with your fellow coders, online or in-person, it’s probably also worth remembering Sayre’s Law…

> “In any dispute the intensity of feeling is inversely proportional to the value of the issues at stake.”

As a consultant, I bounce from client to client, and each one has their own rules and conventions. I decided long ago that the only way for me to succeed was to let go of the trivialities and focus on the hard problems. When it comes to coding standards, I take what I get and I don’t get upset.

If you happen to find yourself in a position to pick your own style guide, I recommend that you ask yourself these two simple questions:

1. Is there tooling that will automatically apply the style rules to my code with little to no intervention from me?

2. Are the tools and underlying styles actively maintained and/or used by reputable organizations?

If you can answer “yes” to both of those questions, then you’re good to go. Simple as that.

Here are some options that fit the bill for some of today’s more popular web languages:

- [DotNet Code Formatter]()
- Java: [Google-Java-Format]()
- [Javascript Standard Style]() (N.B. this is a product name, not an actual, official JavaScript standard)
- [PHP Coding Standards Fixer]()
- Python: [Google’s YAPF]()
- Ruby: [Rubocop]()
