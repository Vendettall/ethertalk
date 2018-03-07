export default function (domNode) {
  let currentScroll = false
  domNode.onscroll = () => currentScroll = true
  if (currentScroll) return
  
  const scrollHeight = domNode.scrollHeight
  const height = domNode.clientHeight
  const maxScrollTop = scrollHeight - height
  domNode.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
}