
import { useRef, useEffect } from "react";

/**
 * @param {(active: boolean) => void} callback
 * @param {ReadonlyArray<any>} deps
 */
export const useActiveEffect = (callback, deps) => {
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  useEffect(() => {
    return callback(activeRef.current);
  }, deps);
};
/** 
该函数是一个定制的React Hook，名为useActiveEffect。它接受两个参数：callback（一个回调函数）和deps（一个依赖数组）。该函数主要功能是控制回调函数的执行时机，并且只在依赖项发生变化时执行回调。

具体实现分为两个步骤：

1、首先，通过useRef创建一个名为activeRef的引用对象，并将其初始值设置为true。这个引用将用于存储当前组件的激活状态。

2、然后，使用useEffect来监听组件的挂载和卸载。在组件挂载时，将activeRef的当前值设置为true；在组件卸载时，将activeRef的当前值设置为false。这里使用空数组[]作为第二个参数，表示这个useEffect只在组件挂载时执行一次。

3、再次使用useEffect来监听依赖项的变化。当依赖项发生变化时，返回一个函数，该函数调用传入的callback函数，并将activeRef的当前值作为参数传递给callback。这里使用deps作为第二个参数，表示这个useEffect会根据依赖项的变化而执行。

综上所述，useActiveEffect函数通过控制activeRef的值来判断组件是否处于激活状态，并在依赖项变化时调用回调函数，将组件的激活状态传递给回调函数。 

const activeRef = useRef(true); 这段代码的意义是什么？
这段代码创建了一个名为activeRef的useRef钩子。它初始化了一个可变的引用对象，其.current属性被设置为true。在React中，useRef常用于保存任何可变的值，这些值在组件的整个生命周期内都存在，并且不会触发组件重新渲染。这里，activeRef可能用于跟踪组件的某种活跃状态，默认初始化为true，意味着组件初始状态下被认为是活跃的。这个引用值可以在组件内部的各个部分被访问和修改，非常适合用来保存那些需要在多个渲染周期间保持不变的变量。
*/
useEffect(() => {
  let active = true;
  if (state.revokeRow) {
    getListUserScoreLogs({
      userName: state.revokeRow.username,
      scoreId: state.revokeRow.id,
    }).then((res) => {
      const { data } = res;
      if (data && active) {
        dispatch({
          type: "set record list",
          payload: data,
        });
      }
    });
  }
  return () => {
    active = false;
  };
}, [state.recordReloadId, state.revokeRow, dispatch]);

/**
为什么要设置这个active？

设置active变量主要是为了解决潜在的竞态条件问题，并优化组件的更新逻辑，具体原因包括：

1、预防不必要的状态更新：在React组件中，尤其是在处理异步操作（如API调用）时，可能会遇到组件已经卸载或状态已经改变，但异步操作的结果仍然返回并尝试更新状态的情况。这不仅浪费资源，还可能导致已经不存在的组件错误地更新，引发难以追踪的问题。通过设置active，可以在异步操作完成前检查该标志，确保只有当组件状态仍需此结果时才执行更新。

2、优化性能和用户体验：避免无用的渲染和计算，特别是在用户交互频繁或数据更新快速的场景下，减少不必要的状态更新可以提升应用的响应速度和整体性能。

3、增强代码的可维护性和可读性：通过引入active作为逻辑控制标志，代码逻辑变得更加清晰，易于理解和维护。开发者可以一眼看出哪些部分的代码是基于当前组件状态是否有效来决定是否执行的。

4、支持动态控制异步操作的消费：在复杂的UI交互中，用户的行为可能快速变化，导致连续的异步请求。active变量提供了一种机制，可以中途取消对不再需要的异步结果的处理，这对于管理资源和保持UI的一致性至关重要。

总之，设置active变量是一种最佳实践，它帮助开发者更好地控制异步逻辑与组件生命周期的协调，避免不必要的工作，提升应用的稳定性和效率。
*/
