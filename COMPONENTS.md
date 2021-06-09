# Scheduler project breakdown

## Components

- Button
- DayList
- DayListItem
- InterviewerList
- InterviewerListItem
- Appointment
- Appointment/Header
- Appointment/Empty
- Appointment/Show
- Appointment/Form
- Appointment/Status
- Appointment/Error
- Appointment/Confirm

### Button

- State:
- Props: confirm-boolean, danger-boolean,onClick-function ,disabled-boolean
- Used by:

### DayList

- State:
- Props: days-array,day-string, setDay-function
- Used by: '<App/>'

### DayListItem

- State:
- Props: name-string, spots-INT, selected-boolean, setDate-function,selected-boolean
- Used by: DayList

### InterviewerList

- State:
- Props: interviewers:array , interviewer:number , setInterviewer:function
- Used by:

### InterviewerListItem

- State:
- Props: id:number, name:string , avatar:url , selected:boolean , setInterviewer:function
- Used by: InterviewerList

### Appointment

- State:
- Props: time:string , interview: Object
- Used by:

### Appointment/Header

- State:
- Props: time:String
- Used by: Appointment

### Appointment/Empty

- State:
- Props: onAdd:Function
- Used by: Appointment

### Appointment/Show

- State:
- Props: student:String , interviewer:Object, onEdit:Function , onDelete:Function
- Used by: Appointment

### Appointment/Form

- State: name:String, interviewer:Number
- Props: name:String, interviewers:Array , interviewer:Number , onSave:Function, onCancel:Function
- Used by:

### Appointment/Status

- State:
- Props: message:String
- Used by:

### Appointment/Error

- State:
- Props: message:String , onClose:Function
- Used by:

### Appointment/Confirm

- State:
- Props: message:String, onConfirm:Function, onCancel:Function
- Used by:
