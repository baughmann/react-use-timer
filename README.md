# React useTimer
A simple timer that updates every millisecond that you can pause, resume, reset, and do something when the countdown completes.


### Setup

First, add it to your project as you normally would.

`$ yarn add react-use-timer`

`import useTimer from "react-use-timer";`


### Example Useage

#### Creating the Timer

Next, simply use the hook as so.

`const Timer = useTimer(10.5, () => doSomethingWhenDone());`


#### Interacting with the timer

To start the timer for the first time, or to resume the timer after pausing, simply call:

`Timer.start()`

Pausing the timer is just as simple:

`Timer.pause()`

To reset the timer back to zero at any time, just call:

`Timer.reset()`

If you'd like to know how much time is left on the timer, just observe the following value, which updates every millisecond:

`Timer.seconds`

If you need to know whether or not the timer is currently running, just use:

`Timer.isActive`

This returns `false` if the timer is paused. It only returns `true` when the timer is actively counting down.

#### Displaying the time remaining

If you wish to tell the user how much time the they have left, you could easily just do something like 
```
<Text>{Math.floor(10.5 - Timer.seconds)}s</Text>
```
Which would output something like 
```
6s
```

### Note

The timer updates one thousand times per second, so if you're observing `Timer.seconds`, ensure that you're not doing anything too crazy.
