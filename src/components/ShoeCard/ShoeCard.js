import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStr = variant === 'on-sale' ? 'Sale' : 'Just Release!'
  const variantColor = (variant === 'on-sale' ? COLORS.primary : COLORS.secondary)

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== 'default' && (
          <VariantLabel style={{ '--bg-color': variantColor }}>
            {variantStr}
          </VariantLabel>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  )
}

const VariantLabel = styled.div`
  position: absolute;
  right: 0;
  top: 12px;
  padding: 8px;
  background-color: var(--bg-color);
  color: ${COLORS.white};
  margin-right: -4px;
  border-radius: 4px;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;

  display: block;
  max-width: 32%;
`

const Wrapper = styled.article`
  position: relative;
`

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  // line-height: 0;
`

const Image = styled.img`
  width: 100%;
  display: block;
`

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span``

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

export default ShoeCard
