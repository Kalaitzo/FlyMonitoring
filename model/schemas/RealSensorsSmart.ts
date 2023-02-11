interface RealSensorsSmart {
    id:string
    type: string
    deviceCategory: Array<string>
    controlledProperty: Array<string>
    value: string
    dateLastValueReported: string
    batteryLevel: number;
}

export default RealSensorsSmart