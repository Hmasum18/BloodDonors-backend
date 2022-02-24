import Distance from "geo-distance";

export default function insideRadius(position1, position2, radius){
    var position1 =  {
        lat: position1.latitude,
        lon: position1.longitude
    };
    var position2 = {
        lat: position2.latitude,
        lon: position2.longitude
    };
    var distance = Distance.between(position1, position2);
    // console.log(position1, position2, radius)
    // console.log(distance.in_good_unit())
    //
    console.log('' + distance.human_readable());
    console.log('' + Distance(radius).human_readable());
    return distance < Distance(radius);
    // if (distance > Distance(radius)) {
    //     console.log('Nice journey!');
    // }
}