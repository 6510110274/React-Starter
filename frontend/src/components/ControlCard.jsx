import { Button, Card, CardContent } from "@mui/joy"

export default function ControlCard({title}){

    const alertStart = (x) => {
        window.alert(`คุณกำลังกด Start : ${title} + ${x}`)
    }
    const showData = () => {
        return (
        <div>
            <li>Hello</li>
            <li>World</li>
        </div>
    )}

    return(
       <div>
        <Card className="m-4 rounded-lg shadow-lg">
            <CardContent>
            <h4 className="text-2xl font-bold">Hello</h4>
            <div className='flex gap-2'>
                <Button color="success" onClick={()=> alertStart(10)}>Start</Button>
                <Button color="neutral">Restart</Button>
                <Button color="danger">Down</Button>
            </div>
            </CardContent>
        </Card>
        {showData()}
       </div>
    )
}