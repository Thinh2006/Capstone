import Phone from "./phone.js"
import { DOMAIN } from "./api.js"
const getElement = (selector)=> document.querySelector(selector)
getElement('#Addphone').onclick = ()=>{
    getElement('#addphone').style.display='inline-block'
    getElement('#update').style.display='none'
    
}
const getphonelist=()=>{
    const promise = axios({
        url:DOMAIN,
        method:`GET`
    })
    promise
    .then((result)=>{
        renderTable(result.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
getphonelist()
const renderTable= (arrPhone)=>{
    let htmlContent = ``
    arrPhone.forEach((item)=>{
        htmlContent +=`
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><img src=${item.img} style='width: 50px; height: 50px;'></td>
            <td>${item.desc}</td>
            <td>
                <div style='max-width:200px'>
                    <button class='btn btn-danger mb-1 ' onclick="deletePhone(${item.id})">Delete</button>
                    <button class='btn btn-success mb-1 ' data-bs-toggle="modal"
                    data-bs-target="#exampleModal" onclick='editPhone(${item.id})'>Edit</button>
                
                </div>
            
            </td>
        </tr>
        
        
        `


    })
    getElement('#tbody').innerHTML=htmlContent
}
const layThongTinDienThoai = ()=>{
    const elements = document.querySelectorAll('#form-phone input,#form-phone select,#form-phone textarea')
    let phone = {}
    elements.forEach((ele)=>{
        const {name,value}= ele
        phone[name]=value
    })
    const{name,price,img,desc}=phone
    return new Phone(name,price,img,desc)
}
getElement('#addphone').onclick = ()=>{

    const phone = layThongTinDienThoai()
console.log(phone);

const promise = axios({
    url: DOMAIN,
    method : `POST`,
    data : phone
})

promise 
.then((result)=>{
    getphonelist()
})
.catch((err)=>{
    console.log(err)
})
}

//Xóa điện thoại 
window.deletePhone = (id)=>{
    console.log(id)
    const promise = axios({
        url: `${DOMAIN}/${id}`,
        method:`DELETE`
    })
    promise 
    .then(()=>{
        getphonelist()
    })
    .catch(()=>{

    })
}

//Edit phone
window.editPhone = (id)=>{
    getElement('#update').style.display = 'inline-block'
    getElement('#addphone').style.display='none'
    getElement('#update').setAttribute('data-id',id)
    const promise = axios({
        url : `${DOMAIN}/${id}`,
        method: `GET`
    })
    promise
    .then((result)=>{
        console.log(result.data)
        const elements = document.querySelectorAll('#form-phone input,#form-phone select,#form-phone textarea')
        elements.forEach(ele =>{
            const{name} = ele
            ele.value = result.data[name]
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

getElement('#update').onclick=()=>{
    const phone = layThongTinDienThoai()
    const id = getElement('#update').getAttribute('data-id')

    const promise = axios({
        url : `${DOMAIN}/${id}`,
        method:'PUT',
        data : phone
    })
    promise
    .then(()=>{
        getphonelist()
    })
    .catch((err)=>{
        console.log(err)
    })
}
//search input
var searchInput = document.querySelector('.search input')
searchInput.addEventListener('input',function(e){
    let txtSearch = e.target.value.trim().toLowerCase()
    let listProductDOM = document.querySelectorAll('tr')
    listProductDOM.forEach(item =>{
        if(item.innerText.toLowerCase().includes(txtSearch)){
            item.classList.remove('hide')
        }else{
            item.classList.add('hide')
        }
    })

})

document.getElementById('reset').onclick=()=>{
    document.getElementById('name').value=''
    document.getElementById('price').value=''
    document.getElementById('screen').value=''
    document.getElementById('backCamera').value=''
    document.getElementById('frontCamera').value=''
    document.getElementById('img').value=''
    document.getElementById('desc').value=''
    document.getElementById('selectBrand').value=''
}

//validation
// document.getElementById('addphone').onclick=function checkform(){
// let name  = document.getElementById('name')
// let price = document.getElementById('price')
// let screen = document.getElementById('screen')
// let backCamera = document.getElementById('backCamera')
// let frontCamera = document.getElementById('frontCamera')
// let img =  document.getElementById('img')
// let desc = document.getElementById('desc')
// let selectBrand = document.getElementById('selectBrand')

// if(name.value != ''){

// }else{
//     document.getElementById('spanname').innerHTML='*Vui lòng nhập tên sản phẩm !'
//     name.focus()
// }
// if(price.value != ''){

// }else{
//     document.getElementById('spanprice').innerHTML='*Vui lòng nhập giá sản phẩm !'
//     price.focus()
// }
// if(screen.value != ''){

// }else{
//     document.getElementById('spanscreen').innerHTML='*Vui lòng nhập màn hình hiển thị !'
//     screen.focus()
// }
// if(backCamera.value != ''){

// }else{
//     document.getElementById('spanbackCamera').innerHTML='*Vui lòng nhập camera sau !'
//     backCamera.focus()
// }
// if(frontCamera.value != ''){

// }else{
//     document.getElementById('spanfrontCamera').innerHTML='*Vui lòng nhập camera trước !'
//     frontCamera.focus()
// }
// if(img.value != ''){

// }else{
//     document.getElementById('spanimg').innerHTML='*Vui lòng chèn hình ảnh !'
//     img.focus()
// }
// if(desc.value != ''){

// }else{
//     document.getElementById('spandesc').innerHTML='*Vui lòng nhập thông tin mô tả !'
//     desc.focus()
// }
// if(selectBrand.value != ''){

// }else{
//     document.getElementById('spanselectBrand').innerHTML='*Vui lòng nhập thương hiệu sản phẩm !'
//     selectBrand.focus()
// }




// }