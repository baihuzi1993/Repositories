import React, { useState, useEffect } from 'react'

export default function TimerHooks () {
  console.log('function start run ' + Date.now())
  const [date, setDate] = useState(new Date())
  const [count, setCount] = useState(0)
  // Similar to componentDidMount and componentDidUpdate:
  // useEffect在挂载和更新阶段都会执行，挂载是肯定会执行一次的，更新阶段执不执行取决于第二个参数依赖数组
  useEffect(() => {
    console.log('timer hooks 的effect执行了', date);
    let timerId = setInterval(() => {
      setDate(new Date())
    }, 1000)

    // 函数内部返回一个函数，用来清除副作用，清除副作用的代码在组件卸载和组件重新渲染之前都会执行，这是为了保证一致性
    // 如果这里不清除定时器，此时在定时器中使用了setDate，又会触发重新渲染，又会执行一遍副作用，导致定时器越来越多，页面卡死，因此这里必须清除定时器
    // 返回的函数在卸载和更新阶段都会执行，卸载是肯定会执行一次的，更新阶段执不执行取决于第二个参数依赖数组
    return () => {
      console.log('取消副作用');
      clearInterval(timerId)
    }

    // 可以在 effect hook 提供的第二个参数中，传入一个数组，数组中定义监控的状态，只有当前状态和上一个状态不一样时，才执行effect，否则不会执行，是一个优化手段
    // 如果传入一个空数组，那么effect只会在componentDidMount执行一次，componentDidUpdate阶段都不会执行，这里副作用是否执行不会影响状态的正常更新
    // 这里需要注意的是，只要是状态发生了变化，整个函数都会重新执行，effect也会重新执行一次
    // 下面的点击事件中，修改了count的值，相当于重新setState了，也会触发整个函数的执行，effect也会重新执行一次
    // 如果点击速度很快，就会导致effect一直重复执行，但又由于是先取消副作用，再执行下一次副作用，因此定时器此时不会走，页面就不会更新
    // 这里就需要给定第二个参数，是一个数组，里面定义的是只有当里面的内容发生改变的时候，副作用才会被执行，此时按钮点击修改的是count，因此不会影响副作用的执行
    // 如果第二个参数传递的是一个空数组，表示没有状态能触发副作用的执行，因此该副作用只会在挂载的时候执行副作用，在卸载的时候清除副作用
  }, []);

  console.log('function end run ' + Date.now())
  return (
    <div>
      <p>时间: {date.toLocaleTimeString()}</p>
      <button onClick={() => { setCount(count + 1) }}>+1</button>
    </div>
  )
}