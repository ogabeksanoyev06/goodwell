import React from "react";
import ReactCodeInput from "react-code-input";

import cx from "classnames";

const CodeInput = ({
					   field,
					   length = 4,
					   handleChange=()=>{},
					   className,
					   disabled,
					   label,
					   form: { touched, errors, setFieldValue },
					   ...props
				   }) => {

	const [touch, setTouch] = React.useState(true);
	const propsStyle = {
		inputStyle: {
			fontSize: '20px',
			MozAppearance: "textfield",
			width: "55px",
			height: "65px",
			marginRight: "10px",
			padding: "0 6px 0 20px",
			backgroundColor: "transparent",
			color: "#000",
			borderRadius: "5px",
			border: "1px solid #1B1B1B",
			marginBottom: "24px",
		},
		inputStyleInvalid: {
			fontSize: '20px',
			MozAppearance: "textfield",
			width: "55px",
			height: "65px",
			marginRight: "10px",
			padding: "0 6px 0 20px",
			backgroundColor: "transparent",
			color: "#000",
			borderRadius: "5px",
			border: "1px solid red",
			marginBottom: "24px",
		}
	};
	const classesWrap = cx("", className, disabled && "is-disable");
	const touchFunc = () => {
		setTouch(false);
	};
	const unTouchFunc = () => {
		setTouch(true);
	};
	return (
		<div className={classesWrap}>
			{label && <label className="code-label"> {label}</label>}
			<ReactCodeInput
				inputMode="numeric"
				placeholder={'ssss'}
				type="text"
				{...field}
				{...props}
				{...propsStyle}
				isValid={touch}
				touch={touchFunc}
				untouch={unTouchFunc}
				fields={length}
				autoFocus={true}
				onChange={event => {
					setFieldValue(field.name, event);
					handleChange(event);
				}}
			/>
		</div>
	);
};

export default CodeInput;