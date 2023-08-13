const Parking=require('../models/parking')



exports.parkingdetails=async(req,res)=>{
    const record=await Parking.find()
    const parkingin=await Parking.count({status:'IN'})
    res.render('parking.ejs',{record,parkingin})
}

exports.addform=(req,res)=>{
    res.render('parkingform.ejs',{message:''})
}

exports.add=(req,res)=>{
    const {vno,vtype}=req.body
    const record=new Parking({vno:vno,vtype:vtype})
    record.save()
    //console.log(record)
    res.render('parkingform.ejs',{message:'Successfully Vechile Added'})
    res.redirect('/parking')
}

exports.update=async(req,res)=>{
    const id=req.params.id
    const record=await Parking.findById(id)
    //console.log(record)
    let vout=new Date()
    let spendtimeparking=((vout-record.vin)/(1000*60*60))
    //console.log(spendtimeparking/(1000*60*60))
    let amount=0
    if(record.vtype=='2w'){
        amount=spendtimeparking*20
    }else if(record.vtype=='3w'){
        amount=spendtimeparking*30
    }else if(record.vtype=='4w'){
        amount=spendtimeparking*100
    }else if(record.vtype=='hw'){
        amount=spendtimeparking*300
    }else if(record.vtype=='lw'){
        amount=spendtimeparking*200
    }else if(record.vtype=='others'){
        amount=spendtimeparking*80
    }
    await Parking.findByIdAndUpdate(id,{vout:vout,amount:Math.round(amount),status:'OUT'})
    res.redirect('/parking')
}


exports.print=async(req,res)=>{
    const id=req.params.id
    const record=await Parking.findById(id)
    res.render('invoice.ejs',{record})
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await Parking.findByIdAndDelete(id)
    res.redirect('/parking')
}