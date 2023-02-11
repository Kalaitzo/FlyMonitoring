interface RealSensorsSmart {
    id:string
    type: string
    deviceCategory: Array<string>
    controlledProperty: Array<string>
    value: string
    dateLastValueRecorded: string
    batteryLevel: number;
}

export default RealSensorsSmart