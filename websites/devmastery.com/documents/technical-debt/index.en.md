---
type: Post
author: Bill Sourour
datePublished: January 1, 2017
image: debt.jpg
imageDescription: "US Dollars fanned out over an iPhone"
published: false
category: Articles
summary: "When is debt a good thing?"
tags: ["programming", "software", "comments", "practices"]
title: "Technical debt"
topic: "software design and architecture"
---

Have you ever shipped a system completely free of technical debt? An application where no corners were cut and no compromises were made in service of deadline or budget? Small personal projects aside, over a 20+ year career, I have never seen such an application in a professional setting.

**Author’s Note:** This post is an excerpt from my weekly [Dev Mastery newsletter](https://devmastery.com). It was originally sent to Dev Mastery subscribers on December 8, 2016.

Check out this article from Tech Crunch about strategically planning your technical debt so that it can be managed and leveraged for maximum benefit.

[ **How to make debt pay**  
\_Not all debt is bad debt. It's conventional wisdom in the world of finance that the strategic use of debt builds better…\_techcrunch.com](https://techcrunch.com/2016/12/04/how-to-make-debt-pay/ "https://techcrunch.com/2016/12/04/how-to-make-debt-pay/")

The article makes some good points, but the author is clearly from a software product company background. There’s no question that it’s hard to convince a product manager to invest in a specific project dedicated to resolving technical debt, especially when that investment won’t result in any new features that the average customer might immediately notice. But at least at a software company there is some vague understanding of the business risk of technical debt. This understanding is much harder to find at agencies, consultancies, and in large enterprises.

If you’re not in a software company, it’s almost impossible to get anyone to approve some specific future project aimed specifically at eliminating technical debt. You have to pad your estimates for fixes or new features so that you can go back and clean a bit of your mess. And you have to be extremely careful about the kind of messes you make to begin with.

Speaking of cleaning messes, refactoring is an important skill for any developer. I’ve written about my approach to this before in…

[ **How to conquer legacy code**  
\_At some point in your developer career, your boss will hand you a piece of legacy code — code that someone else wrote a…\_medium.freecodecamp.com](https://medium.freecodecamp.com/conquer-legacy-code-f9e23a6ab758 "https://medium.freecodecamp.com/conquer-legacy-code-f9e23a6ab758")

Martin Fowler also maintains a good listing of common refactoring techniques that I often use as a reference…

[ **catalog**  
\_I've put together this catalog to help you find and explore the refactorings in the source books. You can expand each…\_refactoring.com](http://refactoring.com/catalog/ "http://refactoring.com/catalog/")

The five I use the most are:

- [Replace an exception with a test](http://refactoring.com/catalog/replaceExceptionWithTest.html)
- [Replace assumptions with assertions](http://refactoring.com/catalog/introduceAssertion.html)
- [Decompose a conditional](http://refactoring.com/catalog/decomposeConditional.html)
- [Consolidate multiple conditional expressions](http://refactoring.com/catalog/consolidateConditionalExpression.html)
- [Replace a constructor with a factory method](http://refactoring.com/catalog/replaceConstructorWithFactoryMethod.html)

---
