//funciones de la API de Gulp 
const {src, dest, series, parallel, watch} = require('gulp'); 
//Paquetes 
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const minifycss =require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
//Constantes de trabajo 

const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html',
    jsPath: 'src/js/**/*.js', 
    jsDistPath: 'dist/js/**/*.js',
    imagesDistPath: 'dist/images/**/*',
    imagePath: 'src/images/**/*'
}

//tareas 
//compilar archivos de SCSS a CSS
function scssTask (done){
    return src(files.scssPath)
    .pipe(sass())//pasar archivos SCSS a CSS
    .pipe(minifycss())//minificar CSS producido por sass()
    .pipe(dest('dist/css')); 
}

function minifyJSTask(done){
    return src(files.jsPath)
    .pipe(uglify())//minificar archivos js
    .pipe(dest('dist/js')); 
}
function imagesTask(done){
    return src(files.imagePath)
    .pipe(imagemin())
    .pipe(dest('dist/images'));
    }

//observador 
function watchTask(){
    watch(
        [files.scssPath, files.htmlPath, files.jsPath, files.imagesDistPath],
        series(scssTask, minifyJSTask, reloadTask)
        )
}

function serveTask(done){
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
    done();
}

function reloadTask(done){
    browserSync.reload();
    done()
}


//exports.css = scssTask;  
exports.images = imagesTask;
exports.default = series(scssTask, serveTask, watchTask);




