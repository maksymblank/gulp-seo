# gulp-seo
> Gulp plugin for adding social meta tags to your website

This Gulp plugin enables you to add meta tags to your website. Here is a simple example using `gulp-seo`:

```javascript
var gulpSeo = require('gulp-seo');

gulp.task('seo', function() {
  return gulp.src('views/index.html')
  .pipe(gulpSeo({
        list: ['og', 'se', 'schema', 'twitter'],
        meta: {
            title: 'Title website',
            description: 'Description website',
            author: 'Maksym Blank',
            keywords: ['website', 'with', 'meta', 'tags'],
            robots: {
                index: false, // true
                follow: true // true
            },
            revisitAfter: '5 month', // 3 month
            image: 'http://mywebsite.com/image.jpg',
            site_name: 'My Website',
            type: 'website'

        }
    }))
    .gulp.dest('views');
});
```

## API
### `gulpSeo([opts])`
 - `opts` (`Object`): Options for adding Meta Tags.
 - `opts.list` (`Array`): List of adding Meta Tags.
 - - og : Open Graph Meta Tags
 - - se : Search Engine Meta Tags
 - - schema : Schema Meta Tags
 - - twitter : Twitter Meta Tags
 - `opts.meta` (`Object`): All desired Meta Tags
 - - title
 - - description
 - - site_name
 - - keywords
 - - author
 - - robots
 - - revisitAfter
 - - image
 - - url
 - - type
 - - contact
 - - abstract
 - - copyright
 - - rating
 - - webauthor
 - - video
 - - locale
 - - audio

## Also See
 - Open Graph - http://ogp.me
 - Search Engine - https://www.metatags.org
 - Twitter - https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
 - Schema - http://schema.org/