---
title: iOS 的 hitTest 和 pointInside 小结
date: 2015-05-01 09:36:47
tags:
---

iOS 应用中，处理和触摸有关的事件是一个必不可少的工作。UIKit 本身提供了丰富的常用 UIControl 控件，如 UIButton、UISwitch 等，使用这些控件时只需用 `addTarget:action:forControlEvents:` 或在 Storyboard 拖出一个 IBAction 就可以轻易实现事件响应；另外，各种各样的 UIGestureRecognizer 也可以为任何 UI 元素添加手势，实现所需的事件处理。

然而，许多场景下需要 App 干涉的 UI 元素的事件响应过程。例如，某个 UIButton 在设计中 frame 很小，而希望它的响应区域更大；或者，App 需要在某些情况下忽略 UIView 的层级关系决定响应 Tap 的元素。

iOS 采用一种叫 **Hit-Testing** 的方式决定接收触摸事件的元素，并提供了 `hitTest:withEvent:` 和 `pointInside:withEvent:` 方法允许 View 决定自身是否接收事件，或具体接收事件的 subview，两个方法第一个参数均为一个相对于 View 自身 bounds 的  `CGPoint`。

一般来说，UIView 在响应到触摸事件时会进行如下判定，同时这也是 `hitTest:withEvent:` *默认*的实现：

* 调用自身的 `pointInside:withEvent:` 方法
* 若返回为 NO，则拒绝接受该事件，`hitTest:withEvent:` 返回 nil，Game Over
* 依次调用自身所有 subview 的 `hitTest:withEvent:`，调用的顺序从最上层的 subview 开始，直到最底层的 subview 或中途返回了非 nil 的 UIView。
* 如果在这个过程中遇到了非 nil 的 UIView，则把这个触摸事件交给它，自身的 `hitTest:withEvent:` 也会成功返回这个 UIView，到此为止。
* 如果所有 subview 的 `hitTest:withEvent:` 方法返回均为 nil，则自身处理这个触摸事件，`hitTest:withEvent:` 方法也会返回 self。

而 `pointInside:withEvent:` 默认实现想必正如字面意思，判定触摸的 CGPoint 是否位于自身 bounds 内。另外需要注意的是，userInteractionEnabled 为 NO 的元素不会响应事件，如 UILabel 和 UIImageView 默认为 NO。

回到之前提到的场景，当 UIButton 自身 frame 过小，如何扩大它响应触摸的区域。一个最常见的做法是改变它的 frame，同时使用 `imageEdgeInsets` 或 `contentEdgeInsets` 等方式为它增加 padding，使 UIButton 的 frame 扩大而不增大它其中的内容。

但个人认为这并不是一种非常优雅的方式，设计师同学在设计时，考虑的一般是内容边缘距离父级元素或同级其他元素的距离，对应到用 Auto Layout 开发时，也就是一个相同数值的 NSLayoutConstraint。但若为了改变它的事件处理而改变 frame，配置约束时就会变得复杂和混乱。

而重载这个 UIButton 的 `pointInside:withEvent:` 方法就可以很好地解决这个问题，由于这个方法的第一个参数是相对于自身 bounds 的 CGPoint，只要判定这个点位于自身 bounds 外围指定距离内的 CGRect 内时返回 YES，就可以在 UIButton 外围响应触摸事件。

横滑滚动多个可以纵向滑动的 UIScrollView（UITableView）也是很多 App 中一个经典的交互设计。而若当这些纵向的 UIScrollView 需要一个公共的 ‘headerView’，并且在它们上滑的时候，希望 UIScrollView 中的内容能遮盖或推走这个 headerView，甚至这个 headerView 还存在可以响应事件的按钮的时候，问题就变得稍微有点微妙。

由于这个 ‘headerView’ 并不希望它属于每个纵向的 UIScrollView，不随着横向滑动而移动，所以它应当独立于横向滑动的 UIScrollView（UICollectionView）之外；由于希望纵向的 UIScrollView 滑动时可以用内容遮盖 headerView 的内容，所以它的层级应该位于横向的 UIScrollView 之下；另外，纵向的 UIScrollView 应该用 contentInset 或透明的 tableHeaderView 让下层的 headerView 露出来。

*看到这里，我想很多同学会疑问“为什么不用两个纵向的 UIScrollView 嵌套起来”，不过想象一下在滑动内层的 UIScrollView 如何处理就变得头大了吧。*

此时，这个 ‘headerView’ 由于位于下层，无法响应事件，如果其中有 UIButton，也无法被点击。而利用重载横向滑动的 UIScrollView `hitTest:withEvent:` 方法，在点击区域位于“本应属于 headerView”的位置时返回 nil，就可以很好地解决这个问题，它的 superview 也自然会把这个事件交给下一个 subview，即这个 headerView 来处理，而这个 headerView 亦会把事件交给对应的 UIButton，最终完成按钮的点击。我在处理这个问题时利用了一个透明的 tableHeaderView，在 `hitTest:withEvent:` 中调用了它的 super 方法，如果拿到的 UIView 正是这个 tableHeaderView，就直接返回 nil，否则返回 super 的结果。

关于这两个问题，我写了一个简单的 Demo，需要的童鞋可以移步 [GitHub](https://github.com/mudkipme/HitTestDemo)，有不同的想法欢迎扔 Issue : )