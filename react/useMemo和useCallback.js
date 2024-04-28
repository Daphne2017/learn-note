/**
useMemo
用途: useMemo 主要用于记忆化计算结果。当你有一个耗时的计算过程或者创建复杂对象的操作，并且这个计算过程的输入参数（依赖项）在多次渲染中没有变化时，useMemo 可以避免重复执行该计算，直接返回上一次计算的结果。
返回值类型: useMemo 返回的是一个值，这个值是计算函数基于依赖项计算出来的结果。
典型场景: 适用于缓存复杂计算结果，如处理大数据、计算布局尺寸、生成图表数据等。

useCallback
用途: useCallback 则是用来记忆化函数。当一个函数被频繁传递给子组件作为props，并且这个函数的内部逻辑并没有随每次渲染而改变时，useCallback 可以确保函数引用的稳定性，避免因为函数引用的变化导致子组件不必要的重新渲染。
返回值类型: useCallback 返回的是一个函数，这个函数在依赖项未改变时保持不变。
典型场景: 适合用于优化那些作为props传递给子组件的函数，尤其是当子组件使用了React.memo进行渲染优化时，稳定的函数引用可以更有效地触发React.memo的shouldComponentUpdate逻辑。


useMemo
功能: useMemo主要用于记住某个计算结果，避免在每次渲染时都重新计算。它接收两个参数：一个是产生计算结果的函数，另一个是依赖数组。当依赖数组中的值没有变化时，返回的 memoized 值（记忆化值）也会保持不变，从而跳过不必要的计算。
使用场景: 当你有一个耗时的计算过程，且其输入参数（依赖项）在多次渲染中保持不变时，可以使用useMemo来缓存计算结果。例如，处理大数据转换、复杂对象的创建等。

useCallback
功能: useCallback则是用来记忆化函数，确保在依赖项不变的情况下，返回的函数引用保持不变。这对于避免子组件因父组件不必要的重新渲染而引起的额外渲染特别有用。它同样接收两个参数：一个是需要记忆化的函数，另一个是依赖数组。
使用场景: 当你有一个函数作为props传递给子组件，而这个函数的创建过程开销较大或不希望它随每次渲染而改变时，使用useCallback可以保证函数的引用在依赖项不变时保持稳定。这对于配合React.memo优化子组件的渲染非常关键，因为只有当props真正变化时，React.memo才会触发子组件的更新。

*/

/**
  为什么使用 useMemo 和 useCallback
  如果一个值被 useEffect 依赖，那它可能需要被缓存，这样可以避免重复执行 effect。
  当变量直接或者通过依赖链成为 useEffect 的依赖项时，那它可能需要被缓存。这是 useMemo 和 useCallback 最基本的用法。
 */

const Component = () => {
  // 在 re-renders 之间缓存 a 的引用
  const a = useMemo(() => ({ test: 1 }), []);
 
  useEffect(() => {
    // 只有当 a 的值变化时，这里才会被触发
    doSomething();
  }, [a]);
 
  // the rest of the code
};
 
const Component = () => {
  // 在 re-renders 之间缓存 fetch 函数
  const fetch = useCallback(() => {
    console.log('fetch some data here');
  }, []);
 
  useEffect(() => {
    // 仅fetch函数的值被改变时，这里才会被触发
    fetch();
  }, [fetch]);
 
  // the rest of the code
 
};


