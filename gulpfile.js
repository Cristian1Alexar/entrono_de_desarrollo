//funciones de la API de Gulp 
const {src, dest, series, parallel, watch} = require('gulp'); 
//Paquetes 
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//Constantes de trabajo 

const files = {
    scssPath: 'src/scss/**/*.scss',
    htmlPath: 'dist/**/*.html'
}

//tareas 
//compilar archivos de SCSS a CSS
function scssTask (done){
    return src(files.scssPath)
    .pipe(sass())
    .pipe(dest('dist/css')); 
}
//observador 
function watchTask(){
    watch(
        [files.scssPath, files.htmlPath],
        series(scssTask, reloadTask)
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

exports.default = series(scssTask, serveTask, watchTask);



