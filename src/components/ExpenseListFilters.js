import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/fiters';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null,
	}
	onFocusChange = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }))
	};
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};
	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value)
	}
	onSortChange = (e) => {
		if (e.target.value==="date") {
			this.props.sortByDate()
		} else if (e.target.value==="amount") {
			this.props.sortByAmount()
		}
	}
	render() {
		return (
			<div>
				<input type='text' value={this.props.filters.text} onChange={this.onTextChange}/>
				<select 
					value={this.props.filters.sortBy}
					onChange={this.onSortChange}
				>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker 
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					onDatesChange={this.onDatesChange}
					numberOfMonths={1}
					isOutsideRange={(day) => false}
					showClearDates={true}
				/>
			</div>
		)
	};
};

const mapStateToProps = (state) => ({
	filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)), 
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);