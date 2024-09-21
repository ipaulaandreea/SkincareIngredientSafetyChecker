import img from '../Home/img.png';
const Message = () => {
    return (
        <div>
        <img src={img} alt="skincare"  style={{ width: '300px', height: 'auto' }} />
        <h2 style = {{paddingBottom: '15px'}}>Your go-to place for checking your skincare for unsafe ingredients</h2>
        </div>
)
}


export default Message;