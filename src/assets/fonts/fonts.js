import {Font} from 'expo';

const fonts = {
        "sentinel":require("./Sentinel-Book.otf"),
        "sentinel-bold":require("./Sentinel-Bold.otf"),
        "FontAwesome":require('./FontAwesome.otf'),
        "verlag-light":require("./Verlag-Light.otf"),
        "verlag":require("./Verlag-Book.otf"),
        "verlag-bold":require("./Verlag-Bold.otf")
}

export default async ()=>{
    await Font.loadAsync(fonts)
    return 
}