import './toggle.css'

export default function ToogleTheme({handleToogle,isChecked,theme}){
    return <div className="toogle-container">
        <input 
        type="checkbox"
        id="checkbox" 
        name="checkbox"
        checked={isChecked}
        onClick={handleToogle}
        />
        <label htmlFor="checkbox">{theme}</label>
    </div>
}