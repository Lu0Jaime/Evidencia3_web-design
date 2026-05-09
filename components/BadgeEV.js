import { IconCircleDot, IconWarning, IconCheck } from '@/components/Icons'

const classMap = {
  'Vencido':          'badge badge-red',
  'Próximo a vencer': 'badge badge-amber',
  'Al día':           'badge badge-green',
}
const icoMap = {
  'Vencido':          <IconCircleDot size={8} />,
  'Próximo a vencer': <IconWarning size={11} />,
  'Al día':           <IconCheck size={11} />,
}

export function BadgeEV({ label }) {
  return (
    <span className={classMap[label] ?? 'badge badge-gray'}>
      {icoMap[label] ?? null} {label}
    </span>
  )
}
