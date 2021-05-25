(async () => {
    const bcrypt = require('bcryptjs')
    
    try {
        
        let text = "demo"

        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(text, salt);
        console.log(hash);

        // let compare = await bcrypt.compare("okay", hash)
        // console.log(compare);

    } catch (error) {

    }

})()