const { src, dest, series, parallel} = require('gulp');
const del = require('delete');
const sass = require('gulp-dart-scss');
const pleeease = require('gulp-pleeease');
const sassdoc = require('sassdoc');
const rename = require('gulp-rename');
const processhtml = require('gulp-processhtml');

function borrar(cb) {
    del("./dist/*");
    cb();
}

function construir_css() {
    return src("scss/main.scss")
    .pipe(sass())
    .pipe(pleeease())
    .pipe(
      rename({
        basename: "styles",
        suffix: ".min",
        extname: ".css"
      }))    
    .pipe(dest('dist/css/'));
}

function construir_docs() {
   var doc_options = {
       dest : "./dist/docs",
       verbose: true
   }
    return src("./scss/*.scss")
   .pipe(sassdoc(doc_options));
}

function mover_img() {
    return src('./img/*')
    .pipe(dest('./dist/img'));
}

function mover_html() {
    return src("./animales.html")
    .pipe(processhtml())
    .pipe(dest('./dist'));
}

function mover_js() {
    return src('./js/*')
    .pipe(dest('./dist/js'));
}

function mover_fonts() {
    return src('./fonts/*')
    .pipe(dest('./dist/css/fonts'));
}


exports.borrar = borrar;
exports.construir_css = construir_css;
exports.construir_docs = construir_docs;
exports.mover_img = mover_img;
exports.mover_html = mover_html;
exports.mover_js = mover_js;
exports.mover_fonts = mover_fonts;
exports.default = series(borrar,
                                       parallel(construir_css,construir_docs),
                                       parallel(mover_img,mover_html,mover_js,mover_fonts));

