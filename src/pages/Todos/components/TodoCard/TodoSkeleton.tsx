import { FC } from 'react'
import { SkeletonWrapper, SwiperWrapper, SkeletonColumn } from './styles'

const TodoSkeleton: FC = () => {
  return (
    <SwiperWrapper spaceBetween={0} slidesPerView='auto'>
      <SkeletonWrapper>
        <SkeletonColumn
          loading
          title={false}
          paragraph={{
            rows: 3,
            width: ['60%', '70%', '50%'],
            style: { marginBottom: 0 },
          }}
          round
        />
      </SkeletonWrapper>
    </SwiperWrapper>
  )
}

export default TodoSkeleton
