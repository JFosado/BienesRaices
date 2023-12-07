import path from 'path'
export default {
    mode:'development',
    entry:{
        map:'./src/lib/map.js',
        customDropzone: './src/lib/customDropzone.js'
    },
    output:{
        filename:'[name].js',
        path: path.resolve('./src/public/js')
    }
}