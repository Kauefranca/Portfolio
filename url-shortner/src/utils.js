const chars = ['j', 'x', '9', '6', 'K', 'C', 'v', 'Y', 'E', 'n'];

exports.encodeId = (id) => {
    var str = '';
    id = id.toString();
    while (id.length < 5) id = '0' + id;
    for (let i of id.split('')) {
        str += chars[i];
    }
    return str;
}

exports.decodeStr = (str) => {
    var decoded = '';
    for (let i of str.split('')) {
        decoded += chars.indexOf(i);
    }
    return decoded;
}