const cartObj = {};

const getCartCount = (crtObj) => {
    let count = 0;
    const keys = Object.keys(crtObj);
    keys.forEach(key => {
        count += crtObj[key];
    });
    return count;
};

const setCartCount = (data, crtObj) => {
    if(crtObj[data.sku]) {
        crtObj[data.sku] += 1;
    } else {
        crtObj[data.sku] = 1; 
    }
    return crtObj;
};

exports.handler = function (event, context, callback) {
    if(event.httpMethod === 'POST') {
        const data = JSON.parse(event.body);
        setCartCount(data, cartObj);
    }
    const count = getCartCount(cartObj);
	callback(null, {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*', 
        },
        body: JSON.stringify({
            count,
            cartObj,
        }),
    });
};

