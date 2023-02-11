// Defining schema interface
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/src/objectid.ts";

interface SmokeSensor {
    _id: ObjectId;
    id: string;
    type: string;
    deviceCategory: Array<string>
    controlledProperty: Array<string>
    batteryLevel: number
    rssi: number
    value: string
    deviceState: string
    dateLastValueReported: string
    dateFirstUsed: string
}

export default SmokeSensor