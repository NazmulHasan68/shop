import { lazy } from "react"


export const resgisterFormControler = [
    {
        name : 'userName',
        label : 'User Name',
        placeholder : "Enter your user name",
        componentType : 'input',
        Type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : "Enter your user Email",
        componentType : 'input',
        Type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : "Enter Password",
        componentType : 'input',
        Type : 'text',
    }
]

export const LoginFormControler = [
    {
        name : 'email',
        label : 'Email',
        placeholder : "Enter your user Email",
        componentType : 'input',
        Type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : "Enter Password",
        componentType : 'input',
        Type : 'text',
    }
]


//add product for admin/product
export const addProductFromElement = [
    {
        label : "Title",
        name : 'title',
        componentType : 'input',
        Type : 'Text',
        placeholder : "Enter product title"
    },
    {
        label : "Description",
        name : 'description',
        componentType : 'textarea',
        placeholder : "Enter product description"
    },
    {
        label : "Category",
        name : 'category',
        componentType : 'select',
        options : [
            {id: 'men', label : 'Men'},
            {id : 'women', label : "Women"},
            {id : "kids", label : "Kids"},
            {id : "accessories", label : "Accessories"},
            {id : "footware" , label : "Footware"},
       ]
    },
    {
        label : "Brand",
        name :  'brand',
        componentType : 'select',
        options : [
            {id: 'nike', label : "Nike"},
            {id: 'adidas', label : "Adidas"},
            {id: "puma", label : "Puma"},
            {id: "levi", label : "Zera"},
            {id : "h&m", label : "H&M"}
        ]
    },
    {
        label : "Price",
        name : 'price',
        componentType : "input",
        type: 'number',
        placeholder : "Enter product price"
    },
    {
        label : "Sale Price",
        name : "salePrice",
        componentType : 'input',
        type : 'number',
        placeholder : "Enter Sale Price (optional)"
    },
    {
        label : "Total Stock",
        name : "totalStock",
        componentType : "input",
        type : "number",
        placeholder : "Enter total stock"
    }
]



export  const shopingViewHeaderMenuItem = [
    {
        id :'home',
        label : 'Home',
        path : '/shop/home'
    },
    {
        id: 'men',
        label : 'Men',
        path : '/shop/listing'
    },
    {
        id: 'women',
        label : 'Women',
        path : '/shop/listing'
    },
    {
        id: 'kits',
        label : 'Kits',
        path : '/shop/listing'
    },
    {
        id: 'watch',
        label : 'Watch',
        path : '/shop/listing'
    },
    {
        id: 'accessories',
        label : 'Accessories',
        path : '/shop/listing'
    },
    {
        id: 'footware',
        label : 'Footware',
        path : '/shop/listing'
    }
]

export const categoryOptionMap = {
    'men' : 'Men',
    'women' : 'Women',
    'kids' : 'Kids',
    'accessories' : 'Accessories',
    'footwear' : 'Footwear'
}

export const brandOptionMap = {
    'nike' : 'Nike',
    'adidas' : 'Adidas',
    'puma' : 'Puma',
    'zera' : 'Zera',
    'levi' : 'Levi',
    'h&m' : 'H&M'
}

export const filterOption ={
    category : [
        {id : 'men', label : "Men"},
        {id : "women" , label : 'Women'},
        {id : 'kids', label : "kids"},
        {id : 'accessories', label : 'Accessories'},
        {id : 'footwear' , label : 'Footware'},
    ],
    brand : [
        {id: 'nike', label : "Nike"},
        {id: 'adidas', label : "Adidas"},
        {id: "puma", label : "Puma"},
        {id: "levi", label : "Levi"},
        {id: "zera", label : "Zera"},
        {id : "h&m", label : "H&M"}
    ]
}

export const sortOption = [
    {id : 'price-lowtohigh' , label: 'Price Low to Hight'},
    {id : 'price-hightolow', label: 'Price High to low'},
    {id : 'title-atoz', label : "Title : A to Z"},
    {id : 'title-ztoa', label : "Title : Z to A"}
]




export const addressFormControls = [
    {
        label : "Address",
        name : 'address',
        componentType : 'input',
        type : 'text',
        placeholder : 'Enter your Address'
    },
    {
        label : "city",
        name : 'city',
        componentType : 'input',
        type : 'text',
        placeholder : "Enter your city"
    },
    {
        label : 'pincode',
        name : 'pincode',
        componentType : 'input',
        text : 'text',
        placeholder : 'Enter your pincode'
    },
    {
        label : 'Phone',
        name : 'phone',
        componentType : 'input',
        type : 'text',
        placeholder : "Enter your phone Number"
    },
    {
        label : 'Notes',
        name : 'notes',
        componentType : 'textarea',
        type : 'text',
        placeholder : "Enter your phone Number"
    },
   
   
]

