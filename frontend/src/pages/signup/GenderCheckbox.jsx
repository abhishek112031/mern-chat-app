// STARTER CODE FOR THIS FILE
const GenderCheckbox = (props) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${props.selectedGender=="male"? "selected":""}`}>
					<span className='label-text'>Male</span>
					<input type='checkbox' className='checkbox border-slate-900' 
					checked={props.selectedGender === 'male'}
					onChange={(e) => {props.onCheckBoxChange('male')}}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${props.selectedGender=="female"? "selected":""}`}>
					<span className='label-text'>Female</span>
					<input type='checkbox' className='checkbox border-slate-900' 
					checked={props.selectedGender === 'female'}
					onChange={(e) => {props.onCheckBoxChange('female')}}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;