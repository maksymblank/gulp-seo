var objectAssign = require('object-assign');
var through = require('through2');
var util = require('gulp-util');
var PluginError = require('gulp-util').PluginError;
var log = require('gulp-util').log;
var cheerio = require('cheerio');

String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

function addSeo(contents, opts){
    var $ = cheerio.load(contents);

    // Starts appending Search Engine Meta Tags
    if(opts.meta){
        if(opts.meta.title){
            if($('title').text()){
                $('title').text(opts.meta.title);
            }else{
                $('head').append('<title>' + opts.meta.title + '</title>');
            }
        }

        // Keywods Array to String
        if(opts.meta.keywords){
            if(Array.isArray(opts.meta.keywords)){
                opts.meta.keywords = opts.meta.keywords.join(', ');
            }
        }
        // Robots Object to String
        if(opts.meta.robots){
            var robotsText = [];
            if(typeof opts.meta.robots.index === 'undefined'){
                robotsText.push('index'); // default index
            }else{
                robotsText.push((opts.meta.robots.index) ? 'index' : 'noindex');
            }
            if(typeof opts.meta.robots.follow === 'undefined'){
                robotsText.push('follow'); // default follow
            }else{
                robotsText.push((opts.meta.robots.follow) ? 'follow' : 'nofollow');
            }
            opts.meta.robots = robotsText.join(', ');
        }


        if(opts.list.indexOf('se') !== -1){
            seList = ['description', 'keywords', 'author', 'robots', 'revisitAfter', 'contact', 'abstract', 'copyright', 'rating', 'webauthor', 'image'];
                // comment before starts appending meta tags
            $('head').append('\n\t<!-- Search Engine Meta Tags -->\n\n');

            for(var tag in opts.meta){
                if(seList.indexOf(tag) !== -1){
                    if(typeof opts.meta[tag] !== 'string') throw new Error(tag + ' should be string');
                    addMeta($, tag.toDash(), opts.meta[tag]);
                }
            }   
        }

            // Starts appending Open Graph Meta Tags
        if(opts.list.indexOf('og') !== -1){
            var ogList = ['title', 'locale', 'video', 'audio', 'description', 'url', 'site_name', 'type', 'image'];
            $('head').append('\n\t<!-- Open Graph Meta Tags -->\n\n');
            $('html').attr('prefix', 'og: http://ogp.me/ns#');

            for(var tag in opts.meta){
                if(ogList.indexOf(tag) !== -1){
                    if(typeof opts.meta[tag] !== 'string') throw new Error(tag + ' should be string');
                    addMeta($, 'og:' + tag, opts.meta[tag]);
                }
            }
        }

        // Starts appeding Schema.org for Google
        if(opts.list.indexOf('schema') !== -1){
            var schemaList = ['site_name', 'image', 'description'];
            $('head').append('\n\t<!-- Schema.org Meta Tags -->\n\n');
            $('html').attr('itemscope', 'itemscope');
            $('html').attr('itemtype', 'http://schema.org/');

            for(var tag in opts.meta){
                if(schemaList.indexOf(tag) !== -1){
                    if(typeof opts.meta[tag] !== 'string') throw new Error(tag + ' should be string');
                    var tagname = tag;
                    if(tagname == 'site_name'){
                        tagname = 'name';
                    }
                    addMetaItemProp($, tagname, opts.meta[tag]);
                }
            }
        }


        // Starts appending Twitter
        if(opts.list.indexOf('twitter') !== -1){
            var twitterList = ['title', 'description'];
            $('head').append('\n\t<!-- Twitter Meta Tags -->\n\n');

            addMeta($, 'twitter:card', 'summary');

            for(var tag in opts.meta){
                if(twitterList.indexOf(tag) !== -1){
                    if(typeof opts.meta[tag] !== 'string') throw new Error(tag + ' should be string');
                    addMeta($, 'twitter:' + tag, opts.meta[tag]);
                }
            }
        }
    }

    return $.html();
}

function addMeta($, name, content){
    if(typeof name === 'string' && typeof content === 'string'){
        if($('meta[name="'+name+'"]').attr('content')){
            $('meta[name="'+name+'"]').remove();
        }
        $('head').append('\t<meta name="' + name + '" content="' + content + '">\n');
    }else{
        throw new Error('Content should be string');
    }
}
function addMetaItemProp($, name, content){
    if(typeof name === 'string' && typeof content === 'string'){
        if($('meta[itemprop="'+name+'"]').attr('content')){
            $('meta[itemprop="'+name+'"]').remove();
        }
        $('head').append('\t<meta itemprop="' + name + '" content="' + content + '">\n');
    }else{
        throw new Error('Content should be string');
    }
}

module.exports = function gulpSeo(options){
    var opts = objectAssign({}, options);

    return through.obj(function compilePug(file, enc, cb) {

        if (file.isStream()) {
            return cb(new PluginError('gulp-seo', 'Streaming not supported'));
        }
        if(file.isBuffer()){
            var compiled;
            var contents = String(file.contents);
            log('compiling file', file.path);
            try{
                compiled = addSeo(contents, opts);
                file.contents = new Buffer(compiled);
            }
            catch(e){
                return cb(new PluginError('gulp-seo', e));
            }
        }
        cb(null, file);
    });
}