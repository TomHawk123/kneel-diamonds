import { getOrders, getSizes, getMetals, getStyles } from "./database.js"

const orders = getOrders()
const sizes = getSizes()
const metals = getMetals()
const styles = getStyles()

// const buildOrderListItem = (order) => {
//     return `<li>
//         Order #${order.id} cost ${order.totalCost}
//     </li>`
// }

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */

    let html = "<ul>"

    const listItems = orders.map(orderHTML)

    html += listItems.join("")
    html += "</ul>"

    return html
}


// Remember that the function you pass to find() must return true/false
const buildOrderMetalItem = (order) => {

    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const totalCost = foundMetal.price
    return totalCost
}

const buildOrderSizeItem = (order) => {
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    const totalCost = foundSize.price
    return totalCost
}


const buildOrderStyleItem = (order) => {
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const totalCost = foundStyle.price
    return totalCost
}


export const orderHTML = (order) => {
    const costs = addCosts(order)
    const costString = costs.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"

    })
    return `
        <li>
        Order #${order.id} cost ${costString}
        </li>`

}




const addCosts = (order) => {
    const metalCost = buildOrderMetalItem(order)
    const sizeCost = buildOrderSizeItem(order)
    const styleCost = buildOrderStyleItem(order)

    const sumOfAllCosts = metalCost + sizeCost + styleCost

    return sumOfAllCosts
}