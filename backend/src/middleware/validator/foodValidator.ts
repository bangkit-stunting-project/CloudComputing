import { Request, Response, NextFunction } from "express";
import * as tf from '@tensorflow/tfjs-node'
import * as fs from "fs";

export const FoodValidator = async (req : Request, res:Response, next:NextFunction) => {
    const path = req.file?.path as string
    var option = {
        root : './'
    }

    const model = await tf.loadLayersModel('file:://src/model/food5kdaffa/model.json')
    const image = fs.readFileSync(`./${path}`)
    const decoded = tf.node.decodeImage(image)
    const resized = tf.image.resizeBilinear(decoded, [200, 200])
    const expanded = tf.expandDims(resized, 0)
    const output = model.predict(expanded) as tf.Tensor
    const result = output.argMax(1).dataSync()[0]
    const foodLabel = ['Food', 'non-Food']
    const lobel = foodLabel[result]
    if (lobel == 'non-Food') {
        res.send({ message : 'Tidak ada makanan terdeteksi. Mohon Foto ulang!'})
        return
    }
    else next()
}
