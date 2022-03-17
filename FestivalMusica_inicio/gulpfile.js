const {src, dest, watch, parallel} = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done){
   
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLavel:3
    }
    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

function versionwebp(done){
    const opcioones={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opcioones))
    .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const opcioones={
        quality:50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opcioones))
    .pipe(dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}


exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionwebp, versionAvif, javascript, dev);