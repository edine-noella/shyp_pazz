const userRoles = {
    ADMIN:"ADMIN",
    STANDARD:"STANDARD_USER",
    SHYP_CREW:"SHYP_CREW",
    SHYP_PATRON:"SHYP_PATRON"
}
Object.freeze(userRoles);

const travelTypes = {
    INTERNATIONAL:"INTERNATIONAL_TRAVELLER",
    LOCAL:"LOCAL_TRAVELLER"
}
Object.freeze(travelTypes);

const IDTypes = {
    PASSPORT_ID: "PASSPORT_ID",
    NATIONAL_ID: "NATIONAL_ID"
}
Object.freeze(IDTypes);

const transportType = {
    INDIVIDUAL:"INDIVIDUAL",
    BUSINESS: "OFFICIAL_BUSINESS"
}
Object.freeze(transportType);

const transportMode = {
    AIR_PLAN:"AIR_PLAN",
    BUS:"BUS",
    MIN_BUS:"MIN_BUS",
    TRAIN:"TRAIN",
    SHIP:"SHIP",
    BICYCLE:"BICYCLE",
    MOTOR_CAR:"MOTOR_CAR",
    MOTOR_CYCLE:"MOTOR_CYCLE",
    PRIVATE_CAR:"PRIVATE_CAR",
    OTHERS:"OTHERS"
}
Object.freeze(transportMode);

const transportFrequency = {
    DAIRY:"DAIRY",
    WEEKLY:"WEEKLY",
    MONTHLY:"MONTHLY",
    ONCE_WHILE:"ONCE_WHILE"
}
Object.freeze(transportFrequency);

const maritialStatus = {
    MARRIED:"MARRIED",
    SINGLE:"SINGLE",
    ENGAGED:"ENGAGED",
    DIVORCED:"DIVORCED",
    NOT_MENTIONED:"NOT_MENTIONED"
}
Object.freeze(maritialStatus);

const enums = {travelTypes, IDTypes,transportType, transportMode, transportFrequency,maritialStatus, userRoles};
module.exports = enums;