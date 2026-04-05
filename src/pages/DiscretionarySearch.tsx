import React, { useState, useMemo } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import Grid from '@mui/joy/Grid';
import { discretionaryItems, categories, type DiscretionaryItem, type Classification } from '../data/discretionaryData';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const classificationConfig: Record<Classification, { label: string; color: string; bgColor: string; icon: React.ReactNode; chipColor: 'success' | 'danger' | 'warning' }> = {
  'non-discretionary': {
    label: 'Non-Discretionary',
    color: '#15803D',
    bgColor: '#F0FDF4',
    icon: <CheckCircleRoundedIcon />,
    chipColor: 'success',
  },
  'discretionary': {
    label: 'Discretionary',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    icon: <CancelRoundedIcon />,
    chipColor: 'danger',
  },
  'conditional': {
    label: 'Conditional',
    color: '#D97706',
    bgColor: '#FFFBEB',
    icon: <HelpRoundedIcon />,
    chipColor: 'warning',
  },
};

interface ItemCardProps {
  item: DiscretionaryItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const config = classificationConfig[item.classification];

  return (
    <Card
      sx={{
        border: `2px solid ${config.bgColor}`,
        bgcolor: 'white',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        '&:hover': {
          borderColor: config.color + '40',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-1px)',
        },
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Header Row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography level="title-sm" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
              {item.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                size="sm"
                variant="soft"
                color={config.chipColor}
                startDecorator={React.cloneElement(config.icon as React.ReactElement, { sx: { fontSize: 14 } })}
                sx={{ fontWeight: 700, fontSize: '11px' }}
              >
                {config.label}
              </Chip>
              <Chip size="sm" variant="outlined" sx={{ fontSize: '11px', color: '#64748B', borderColor: '#E2E8F0' }}>
                {item.category}
              </Chip>
            </Box>
          </Box>
        </Box>

        {/* Form Line */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, p: 1, borderRadius: '8px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <ReceiptLongRoundedIcon sx={{ fontSize: 14, color: '#64748B', flexShrink: 0 }} />
          <Typography level="body-xs" sx={{ color: '#475569', fontWeight: 500 }}>
            <Typography component="span" level="body-xs" sx={{ fontWeight: 700, color: '#1E293B' }}>
              Form:{' '}
            </Typography>
            {item.formLine}
          </Typography>
        </Box>

        {/* Description */}
        <Typography level="body-sm" sx={{ color: '#64748B', lineHeight: 1.6, mb: 1 }}>
          {item.description}
        </Typography>

        {/* Classification Reasoning */}
        <Box sx={{ p: 1.5, borderRadius: '8px', bgcolor: config.bgColor, mb: expanded ? 1.5 : 0 }}>
          <Typography level="body-xs" sx={{ color: config.color, fontWeight: 600, lineHeight: 1.6 }}>
            <Typography component="span" level="body-xs" sx={{ fontWeight: 800, color: config.color }}>
              Why {config.label.toLowerCase()}:{' '}
            </Typography>
            {item.reasoning}
          </Typography>
        </Box>

        {/* Expandable Section */}
        {expanded && (
          <>
            {item.examples.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography level="body-xs" sx={{ fontWeight: 700, color: '#374151', mb: 0.75 }}>
                  Real-life examples:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {item.examples.map((ex, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: config.color, mt: 0.5, flexShrink: 0 }} />
                      <Typography level="body-xs" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                        {ex}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {item.claimTip && (
              <>
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: 1.5, borderRadius: '8px', bgcolor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <TipsAndUpdatesRoundedIcon sx={{ fontSize: 16, color: '#D97706', flexShrink: 0, mt: 0.125 }} />
                  <Box>
                    <Typography level="body-xs" sx={{ fontWeight: 700, color: '#92400E', mb: 0.25 }}>
                      How to claim this:
                    </Typography>
                    <Typography level="body-xs" sx={{ color: '#92400E', lineHeight: 1.6 }}>
                      {item.claimTip}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </>
        )}

        <Typography level="body-xs" sx={{ color: '#2266D9', mt: 1.5, fontWeight: 500, textAlign: 'right' }}>
          {expanded ? 'Click to collapse ▲' : 'Click to see examples & tips ▼'}
        </Typography>
      </CardContent>
    </Card>
  );
};

const DiscretionarySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedClassification, setSelectedClassification] = useState<Classification | 'all'>('all');

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    return discretionaryItems.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q) ||
        item.formLine.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesClassification =
        selectedClassification === 'all' || item.classification === selectedClassification;

      return matchesQuery && matchesCategory && matchesClassification;
    });
  }, [query, selectedCategory, selectedClassification]);

  const counts = useMemo(() => ({
    total: discretionaryItems.length,
    nonDiscretionary: discretionaryItems.filter((i) => i.classification === 'non-discretionary').length,
    conditional: discretionaryItems.filter((i) => i.classification === 'conditional').length,
    discretionary: discretionaryItems.filter((i) => i.classification === 'discretionary').length,
  }), []);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography level="h2" sx={{ fontWeight: 800, color: '#0D2137', mb: 0.5 }}>
          Discretionary Item Lookup
        </Typography>
        <Typography level="body-md" sx={{ color: '#64748B', maxWidth: 680, lineHeight: 1.6 }}>
          Search for any expense to find out if it's discretionary (luxury) or non-discretionary (necessary). 
          Non-discretionary items can be claimed on your monthly form to reduce your payment.
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} sm={4}>
          <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#F0FDF4', border: '1px solid #BBF7D0', textAlign: 'center' }}>
            <Typography level="h4" sx={{ fontWeight: 800, color: '#15803D' }}>{counts.nonDiscretionary}</Typography>
            <Typography level="body-xs" sx={{ color: '#166534', fontWeight: 600 }}>✓ Non-Discretionary</Typography>
            <Typography level="body-xs" sx={{ color: '#15803D', mt: 0.25 }}>Claimable on your form</Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={4}>
          <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#FFFBEB', border: '1px solid #FDE68A', textAlign: 'center' }}>
            <Typography level="h4" sx={{ fontWeight: 800, color: '#D97706' }}>{counts.conditional}</Typography>
            <Typography level="body-xs" sx={{ color: '#92400E', fontWeight: 600 }}>? Conditional</Typography>
            <Typography level="body-xs" sx={{ color: '#D97706', mt: 0.25 }}>Depends on your situation</Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={4}>
          <Box sx={{ p: 2, borderRadius: '12px', bgcolor: '#FEF2F2', border: '1px solid #FECACA', textAlign: 'center' }}>
            <Typography level="h4" sx={{ fontWeight: 800, color: '#DC2626' }}>{counts.discretionary}</Typography>
            <Typography level="body-xs" sx={{ color: '#991B1B', fontWeight: 600 }}>✗ Discretionary</Typography>
            <Typography level="body-xs" sx={{ color: '#DC2626', mt: 0.25 }}>Not claimable</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Legend */}
      <Alert
        variant="soft"
        color="neutral"
        startDecorator={<InfoRoundedIcon />}
        sx={{ mb: 3, borderRadius: '12px' }}
      >
        <Typography level="body-sm" sx={{ lineHeight: 1.6 }}>
          <strong>Non-Discretionary</strong> = necessary expense, claim it fully.{' '}
          <strong>Conditional</strong> = may be claimable depending on your circumstances — discuss with your trustee.{' '}
          <strong>Discretionary</strong> = luxury expense, not claimable (look to reduce or eliminate).
        </Typography>
      </Alert>

      {/* Search and Filters */}
      <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', mb: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Input
            size="lg"
            placeholder="Search expenses... (e.g. 'groceries', 'netflix', 'physio', 'car insurance')"
            startDecorator={<SearchRoundedIcon />}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2.5, borderRadius: '10px', fontSize: '15px' }}
          />

          {/* Classification Filter */}
          <Box sx={{ mb: 2 }}>
            <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
              Filter by Type
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {(['all', 'non-discretionary', 'conditional', 'discretionary'] as const).map((c) => (
                <Chip
                  key={c}
                  variant={selectedClassification === c ? 'solid' : 'outlined'}
                  color={c === 'non-discretionary' ? 'success' : c === 'conditional' ? 'warning' : c === 'discretionary' ? 'danger' : 'neutral'}
                  onClick={() => setSelectedClassification(c)}
                  sx={{ cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}
                >
                  {c === 'all' ? 'All Types' : c === 'non-discretionary' ? 'Non-Discretionary' : c === 'conditional' ? 'Conditional' : 'Discretionary'}
                </Chip>
              ))}
            </Box>
          </Box>

          {/* Category Filter */}
          <Box>
            <Typography level="body-xs" sx={{ fontWeight: 700, color: '#64748B', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>
              Filter by Category
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  variant={selectedCategory === cat ? 'solid' : 'soft'}
                  color={selectedCategory === cat ? 'primary' : 'neutral'}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{ cursor: 'pointer', fontWeight: 500, fontSize: '12px' }}
                >
                  {cat}
                </Chip>
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Results Count */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography level="body-sm" sx={{ color: '#64748B', fontWeight: 500 }}>
          Showing <strong>{filteredItems.length}</strong> of {counts.total} items
          {query && ` for "${query}"`}
        </Typography>
        {(query || selectedCategory !== 'All' || selectedClassification !== 'all') && (
          <Chip
            size="sm"
            variant="soft"
            color="neutral"
            onClick={() => { setQuery(''); setSelectedCategory('All'); setSelectedClassification('all'); }}
            sx={{ cursor: 'pointer', fontWeight: 600 }}
          >
            Clear filters
          </Chip>
        )}
      </Box>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <Card sx={{ border: '1px solid #E2E8F0', bgcolor: 'white', p: 4, textAlign: 'center' }}>
          <SearchRoundedIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 2 }} />
          <Typography level="title-md" sx={{ color: '#64748B', mb: 1 }}>
            No results found for "{query}"
          </Typography>
          <Typography level="body-sm" sx={{ color: '#94A3B8' }}>
            Try a different search term, or ask your Licensed Insolvency Trustee about this specific expense.
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid key={item.id} xs={12} md={6} lg={4}>
              <ItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DiscretionarySearch;
