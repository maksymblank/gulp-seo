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
            revisitAfter: '5 month', // 5 month
            image: 'http://mywebsite.com/image.jpg',
            site_name: 'My Website',
            type: 'website',
            url: 'http://mywebsite.com/'

        }
    }))
    .pipe(gulp.dest('./views'));
});
```
## Output
```html
<title>Title website</title>
<meta name="description" content="Description website">
<meta name="author" content="Maksym Blank">
<meta name="keywords" content="website', 'with', 'meta', 'tags">
<meta name="robots" content="index, follow">
<meta name="revisit-after" content="5 month">
<meta name="image" content="http://mywebsite.com/image.jpg">

<!-- Open Graph Meta tags -->
<meta property="og:title" content="Title website">
<meta property="og:description" content="Description website">
<meta property="og:url" content="http://mywebsite.com/">
<meta property="og:image" content="http://mywebsite.com/image.jpg">
<meta property="og:site_name" content="My Website">
<meta property="og:type" content="website">

<!-- google + Meta tags -->
<meta itemprop="description" content="Description website">
<meta itemprop="image" content="http://mywebsite.com/image.jpg">
<meta itemprop="name" content="Title website">

<!-- Twitter Meta tags -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Title website">
<meta name="twitter:description" content="Description website">
<meta name="twitter:image" content="http://mywebsite.com/image.jpg">
<meta name="twitter:site" content="http://mywebsite.com/">


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

 ## Options opts.meta

### title

Your website's title.

Type: `string`

Required: `true`

Example: 
```html
<title>My Website</title>
```

### description

Your website's description.

Type: `string`

Required: `true`

Example: 
```html
<meta name="description" content="Description of this personal website..">
```

### site_name

If your object is part of a larger web site, the name which should be displayed for the overall site.

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:site_name" content="Personal website">
```

### keywords

Your website's keywords.

Type: `string`, `array`

Required: `false`

Example: 
```html
<meta name="keywods" content="my new website, awesome website">
```

### author

Your website's author.

Type: `string`

Required: `false`

Example: 
```html
<meta name="author" content="John Smith">
```

### robots

Type: `object`

Required: `false`

Example: 
```html
<meta name="robots" content="noindex, follow">
```

### revisitAfter

Type: `string`

Required: `false`

Example: 
```html
<meta name="revisit-after" content="3 month">
```

### image

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:image" content="http://mywebsite.com/image.jpg">
```

### url

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:url" content="http://mywebsite.com/">
```

### type

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:type" content="website">
```

### contact

Type: `string`

Required: `false`

Example: 
```html
<meta name="contact" content="support@mywebsite.com">
```

### abstract

Type: `string`

Required: `false`

Example: 
```html
<meta name="abstract" content="Small description of my website">
```

### copyright

Type: `string`

Required: `false`

Example: 
```html
<meta name="copyright" content="name of owner">
```

### rating

Valid Values: general | mature | restricted | 14 years | safe for kids

Type: `string`

Required: `false`

Example: 
```html
<meta name="rating" content="14 years">
```

### webauthor

Type: `string`

Required: `false`

Example: 
```html
<meta name="webauthor" content="Maksym Blank">
```

### video

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:video" content="http://mywebsite.com/video">
```

### locale

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:locale" content="en_Us">
```

### audio

Type: `string`

Required: `false`

Example: 
```html
<meta property="og:audio" content="http://mywebsite.com/audio">
```

## Also See
 - Open Graph - http://ogp.me
 - Search Engine - https://www.metatags.org
 - Twitter - https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
 - Schema - http://schema.org/