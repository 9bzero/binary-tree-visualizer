import{useState,useCallback}from'react'
  interface Node{val:number;left?:Node;right?:Node;x?:number;y?:number}
  function insert(root:Node|null,val:number):Node{if(!root)return{val};if(val<root.val)return{...root,left:insert(root.left||null,val)};if(val>root.val)return{...root,right:insert(root.right||null,val)};return root}
  function remove(root:Node|null,val:number):Node|null{if(!root)return null;if(val<root.val)return{...root,left:remove(root.left||null,val)};if(val>root.val)return{...root,right:remove(root.right||null,val)};if(!root.left)return root.right||null;if(!root.right)return root.left;let min=root.right;while(min.left)min=min.left;return{...root,val:min.val,right:remove(root.right,min.val)}}
  function assignPos(node:Node|null,x:number,y:number,gap:number):Node|null{if(!node)return null;const n2={...node,x,y};if(node.left)n2.left=assignPos(node.left,x-gap,y+70,gap/1.8)||undefined;if(node.right)n2.right=assignPos(node.right,x+gap,y+70,gap/1.8)||undefined;return n2}
  function flatten(node:Node|null):Node[]{if(!node)return[];return[node,...flatten(node.left||null),...flatten(node.right||null)]}
  function edges(node:Node|null):Array<[Node,Node]>{if(!node)return[];const e:Array<[Node,Node]>=[];if(node.left){e.push([node,node.left]);e.push(...edges(node.left))}if(node.right){e.push([node,node.right]);e.push(...edges(node.right))}return e}
  function inorder(node:Node|null):number[]{if(!node)return[];return[...inorder(node.left||null),node.val,...inorder(node.right||null)]}
  export default function App(){
    const[root,setRoot]=useState<Node|null>(()=>{let r:Node|null=null;[50,30,70,20,40,60,80,10,35].forEach(v=>{r=insert(r,v)});return r})
    const[inp,setInp]=useState("")
    const[highlighted,setHighlighted]=useState<number|null>(null)
    const[msg,setMsg]=useState("")
    const positioned=root?assignPos(root,350,40,120):null
    const nodes=flatten(positioned)
    const edgeList=edges(positioned)
    const W=700,H=400
    const add=()=>{const v=parseInt(inp);if(isNaN(v)){setMsg("Enter a valid number");return}setRoot(r=>insert(r,v));setHighlighted(v);setMsg("Inserted "+v);setInp("");setTimeout(()=>setHighlighted(null),1500)}
    const del=()=>{const v=parseInt(inp);if(isNaN(v)){setMsg("Enter a valid number");return}setRoot(r=>remove(r,v));setMsg("Removed "+v);setInp("");setHighlighted(null)}
    const search=useCallback(()=>{const v=parseInt(inp);if(isNaN(v)){setMsg("Enter a valid number");return}let cur=root;while(cur){if(cur.val===v){setHighlighted(v);setMsg("Found "+v+" ✓");return}cur=v<cur.val?cur.left||null:cur.right||null}setMsg(v+" not found");setHighlighted(null)},[root,inp])
    const reset=()=>{let r:Node|null=null;[50,30,70,20,40,60,80].forEach(v=>{r=insert(r,v)});setRoot(r);setMsg("");setHighlighted(null)}
    return(
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",padding:"1.5rem"}}>
        <h1 style={{fontWeight:800,fontSize:"1.5rem",color:"#f8fafc"}}>🌳 Binary Search Tree</h1>
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Value" type="number" style={{width:90,background:"#1e293b",border:"1px solid #334155",borderRadius:6,padding:"0.4rem 0.75rem",color:"#e2e8f0",outline:"none",fontSize:"0.85rem"}}/>
          {[{l:"Insert",fn:add,c:"#22c55e"},{l:"Delete",fn:del,c:"#ef4444"},{l:"Search",fn:search,c:"#0ea5e9"}].map(({l,fn,c})=><button key={l} onClick={fn} style={{padding:"0.4rem 0.9rem",background:c,color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.82rem"}}>{l}</button>)}
          <button onClick={reset} style={{padding:"0.4rem 0.75rem",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:6,cursor:"pointer",fontSize:"0.82rem"}}>Reset</button>
        </div>
        {msg&&<div style={{color:"#94a3b8",fontSize:"0.85rem"}}>{msg}</div>}
        <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,overflow:"auto",maxWidth:"100%"}}>
          <svg width={W} height={H}>
            {edgeList.map(([p,c],i)=><line key={i} x1={p.x} y1={p.y} x2={c.x} y2={c.y} stroke="#334155" strokeWidth={1.5}/>)}
            {nodes.map(n=>(
              <g key={n.val}>
                <circle cx={n.x} cy={n.y} r={22} fill={n.val===highlighted?"#f59e0b":"#1e293b"} stroke={n.val===highlighted?"#f59e0b":"#38bdf8"} strokeWidth={2}/>
                <text x={n.x} y={n.y} textAnchor="middle" dy="0.35em" fill={n.val===highlighted?"#0f172a":"#e2e8f0"} fontSize={13} fontWeight={700}>{n.val}</text>
              </g>
            ))}
          </svg>
        </div>
        <div style={{color:"#475569",fontSize:"0.8rem"}}>Inorder: {inorder(root).join(" → ")}</div>
      </div>
    )
  }